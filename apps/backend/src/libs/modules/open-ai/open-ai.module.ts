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
		const existingAssistants = await this.openAi.beta.assistants.list();
		const assistant = existingAssistants.data.find(
			(assistant) => assistant.name === OpenAiAssistantConfig.NAME,
		);

		try {
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
		if (run.required_action) {
			await Promise.all(
				run.required_action.submit_tool_outputs.tool_calls.map(
					async (toolCall) => {
						const { function: toolFunction } = toolCall;

						if (toolFunction.name === functionName) {
							await this.openAi.beta.threads.runs.submitToolOutputsAndPoll(
								run.thread_id,
								run.id,
								{
									tool_outputs: [
										{
											output: toolCall.function.arguments,
											tool_call_id: toolCall.id,
										},
									],
								},
							);
						}
					},
				),
			);
		}
	}

	private async handleRunStatus(
		threadId: string,
		run: OpenAI.Beta.Threads.Runs.Run,
		functionName: string,
	): Promise<OpenAiResponseMessage> {
		if (run.status === "completed") {
			return await this.getAllMessagesBy(threadId);
		} else if (run.status === "requires_action") {
			await this.handleRequiresAction(run, functionName);

			return await this.getAllMessagesBy(threadId);
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
		const newMessage = await this.openAi.beta.threads.messages.create(
			threadId,
			message,
		);

		if ("error" in newMessage) {
			throw new OpenAIError({
				message: OpenAIErrorMessage.WRONG_RESPONSE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		return true;
	}

	public async createThread(
		message: OpenAiRequestMessage[] = [],
	): Promise<string> {
		const thread = await this.openAi.beta.threads.create({ messages: message });

		if ("error" in thread) {
			throw new OpenAIError({
				message: OpenAIErrorMessage.WRONG_RESPONSE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		return thread.id;
	}

	public async deleteThread(threadId: string): Promise<boolean> {
		const result = await this.openAi.beta.threads.del(threadId);

		if (!result.deleted) {
			throw new OpenAIError({
				message: OpenAIErrorMessage.WRONG_RESPONSE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		return result.deleted;
	}

	public async getAllMessagesBy(
		threadId: string,
	): Promise<OpenAiResponseMessage> {
		return await this.openAi.beta.threads.messages.list(threadId);
	}

	async initializeAssistant(): Promise<void> {
		this.assistantId = await this.getOrInitializeAssistant();
	}

	public async runThread(
		threadId: string,
		runOptions: OpenAiRunThreadRequestDto,
	): Promise<OpenAiResponseMessage> {
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

		return await this.handleRunStatus(threadId, run, runOptions.function_name);
	}
}

export { OpenAi };
