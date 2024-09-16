import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

import { type Config } from "~/libs/modules/config/config.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import {
	OpenAiAssistantConfig,
	OpenAIErrorMessage,
} from "./libs/enums/enums.js";
import { OpenAIError } from "./libs/exceptions/exceptions.js";
import {
	type OpenAiRequestMessage,
	type OpenAiResponseMessage,
	type OpenAiRunThreadRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	config: Config;
	logger: Logger;
};

class OpenAi {
	private assistantId: null | string = null;
	private config: Config;
	private logger: Logger;
	private openAi: OpenAI;

	public constructor({ config, logger }: Constructor) {
		this.config = config;
		this.logger = logger;
		this.openAi = this.createOpenAi();
	}

	private createOpenAi(): OpenAI {
		return new OpenAI({
			apiKey: this.config.ENV.OPEN_AI.API_KEY,
		});
	}

	private async getOrInitializeAssistant(): Promise<string> {
		try {
			const existingAssistants = await this.openAi.beta.assistants.list();
			const assistant = existingAssistants.data.find(
				(assistant) => assistant.name === OpenAiAssistantConfig.NAME,
			);

			const initializedAssistant =
				assistant ??
				(await this.openAi.beta.assistants.create({
					instructions: OpenAiAssistantConfig.INSTRUCTION,
					model: this.config.ENV.OPEN_AI.MODEL,
					name: OpenAiAssistantConfig.NAME,
					temperature: OpenAiAssistantConfig.TEMPERATURE,
					tools: [...OpenAiAssistantConfig.TOOLS],
					top_p: OpenAiAssistantConfig.TOP_P,
				}));

			this.logger.info(
				`AI Assistant "${initializedAssistant.name as string}" is fully ready for interaction.`,
			);
			this.logger.info(`AI Assistant model - "${initializedAssistant.model}".`);

			return initializedAssistant.id;
		} catch (error) {
			this.logger.error(`Error initializing AI assistant: ${String(error)}`);

			throw new OpenAIError({
				message: OpenAIErrorMessage.WRONG_RESPONSE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}
	}

	private async handleRequiresAction(
		run: OpenAI.Beta.Threads.Runs.Run,
		functionName: string,
	): Promise<void> {
		if (!run.required_action) {
			return;
		}

		const { tool_calls } = run.required_action.submit_tool_outputs;

		await Promise.all(
			tool_calls.map(
				async ({
					function: toolFunction,
					function: { arguments: arguments_ },
					id,
				}) => {
					if (toolFunction.name !== functionName) {
						return;
					}

					try {
						await this.openAi.beta.threads.runs.submitToolOutputsAndPoll(
							run.thread_id,
							run.id,
							{
								tool_outputs: [
									{
										output: arguments_,
										tool_call_id: id,
									},
								],
							},
						);
					} catch (error) {
						this.logger.error(
							`Error submitting tool outputs: ${String(error)}`,
						);

						throw new OpenAIError({
							message: OpenAIErrorMessage.WRONG_RESPONSE,
							status: HTTPCode.INTERNAL_SERVER_ERROR,
						});
					}
				},
			),
		);
	}

	private async handleRunStatus(
		threadId: string,
		run: OpenAI.Beta.Threads.Runs.Run,
		functionName: string,
	): Promise<OpenAiResponseMessage> {
		if (run.status === "completed") {
			return await this.getAllMessages(threadId);
		} else if (run.status === "requires_action") {
			await this.handleRequiresAction(run, functionName);

			return await this.getAllMessages(threadId);
		} else {
			this.logger.error(`AI Assistant run failed: ${run.status}`);

			throw new OpenAIError({
				message: OpenAIErrorMessage.WRONG_RESPONSE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}
	}

	public async addMessageToThread(
		threadId: string,
		message: OpenAiRequestMessage,
	): Promise<boolean> {
		try {
			const newMessage = await this.openAi.beta.threads.messages.create(
				threadId,
				message,
			);

			return !("error" in newMessage);
		} catch (error) {
			this.logger.error(`Error adding message to thread: ${String(error)}`);

			throw new OpenAIError({
				message: OpenAIErrorMessage.WRONG_RESPONSE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}
	}

	public async createThread(
		message: OpenAiRequestMessage[] = [],
	): Promise<string> {
		try {
			const thread = await this.openAi.beta.threads.create({
				messages: message,
			});

			if ("error" in thread) {
				throw new OpenAIError({
					message: OpenAIErrorMessage.WRONG_RESPONSE,
					status: HTTPCode.INTERNAL_SERVER_ERROR,
				});
			}

			return thread.id;
		} catch (error) {
			this.logger.error(`Error creating thread: ${String(error)}`);

			throw new OpenAIError({
				message: OpenAIErrorMessage.WRONG_RESPONSE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}
	}

	public async deleteThread(threadId: string): Promise<boolean> {
		try {
			const result = await this.openAi.beta.threads.del(threadId);

			return result.deleted;
		} catch (error) {
			this.logger.error(`Error deleting thread: ${String(error)}`);

			throw new OpenAIError({
				message: OpenAIErrorMessage.WRONG_RESPONSE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}
	}

	public async getAllMessages(
		threadId: string,
	): Promise<OpenAiResponseMessage> {
		try {
			return await this.openAi.beta.threads.messages.list(threadId);
		} catch (error) {
			this.logger.error(`Error getting messages: ${String(error)}`);

			throw new OpenAIError({
				message: OpenAIErrorMessage.WRONG_RESPONSE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}
	}

	async initializeAssistant(): Promise<void> {
		this.assistantId = await this.getOrInitializeAssistant();
	}

	public async runThread(
		threadId: string,
		runOptions: OpenAiRunThreadRequestDto,
	): Promise<OpenAiResponseMessage> {
		try {
			const runs = await this.openAi.beta.threads.runs.list(threadId);

			const pendingRuns = runs.data.filter(
				(run) => run.status === "in_progress" || run.status === "queued",
			);

			for (const run of pendingRuns) {
				await this.openAi.beta.threads.runs.poll(threadId, run.id);
			}

			const run = await this.openAi.beta.threads.runs.createAndPoll(threadId, {
				additional_instructions: runOptions.additional_instructions,
				additional_messages: runOptions.messages,
				assistant_id: this.assistantId as string,
				instructions: runOptions.instructions,
				response_format: zodResponseFormat(
					runOptions.validationSchema,
					"use_response_validation",
				),
				tool_choice: {
					function: { name: runOptions.function_name },
					type: "function",
				},
			});

			return await this.handleRunStatus(
				threadId,
				run,
				runOptions.function_name,
			);
		} catch (error) {
			this.logger.error(`Error running thread: ${String(error)}`);

			throw new OpenAIError({
				message: OpenAIErrorMessage.WRONG_RESPONSE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}
	}
}

export { OpenAi };
