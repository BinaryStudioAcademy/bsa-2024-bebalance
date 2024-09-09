import { OpenAI } from "openai";

import { ZERO_INDEX } from "~/libs/constants/constants.js";
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
} from "./libs/types/types.js";
import {
	BalanceAnalysis,
	zodResponseFormat,
} from "./libs/validation-schemas/validation-schemas.js";

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
					tools: [...OpenAiAssistantConfig.TOOLS],
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

	public async generateBalanceAnalysis(
		threadId: string,
		prompt: OpenAiRequestMessage,
	): Promise<OpenAiResponseMessage[]> {
		const response: OpenAiResponseMessage[] =
			await this.openAi.beta.threads.runs
				.stream(threadId, {
					additional_messages: [prompt],
					assistant_id: this.assistantId as string,
					response_format: zodResponseFormat(
						BalanceAnalysis,
						"balance_analysis",
					),
					stream: true,
				})
				.finalMessages();

		if (response.length === ZERO_INDEX) {
			throw new OpenAIError({
				message: OpenAIErrorMessage.WRONG_RESPONSE,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		return response;
	}

	public async getAllMessagesBy(
		threadId: string,
	): Promise<OpenAI.CursorPage<OpenAiResponseMessage>> {
		return await this.openAi.beta.threads.messages.list(threadId);
	}

	public async initializeAssistant(): Promise<void> {
		this.assistantId = await this.getOrInitializeAssistant();
	}
}

export { OpenAi };
