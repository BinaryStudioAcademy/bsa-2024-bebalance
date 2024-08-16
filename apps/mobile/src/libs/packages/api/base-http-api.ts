import { type ContentType, ServerErrorType } from "~/libs/enums/enums";
import { configureString } from "~/libs/helpers/helpers";
import {
	type HTTP,
	type HTTPApi,
	type HTTPApiOptions,
	type HTTPApiResponse,
	type HTTPCode,
	HTTPHeader,
} from "~/libs/packages/http/http";
import { HTTPError } from "~/libs/packages/http/libs/exceptions/http-error.exception";
import { type ServerErrorResponse, type ValueOf } from "~/libs/types/types";

import { type Storage, StorageKey } from "../storage/storage";

type Constructor = {
	baseUrl: string;
	path: string;
	http: HTTP;
	storage: Storage;
};

class BaseHttpApi implements HTTPApi {
	private baseUrl: string;

	private path: string;

	private http: HTTP;

	private storage: Storage;

	public constructor({ baseUrl, http, path, storage }: Constructor) {
		this.baseUrl = baseUrl;
		this.path = path;
		this.http = http;
		this.storage = storage;
	}

	public async load(
		path: string,
		options: HTTPApiOptions,
	): Promise<HTTPApiResponse> {
		const { method, contentType, payload = null, hasAuth } = options;

		const headers = await this.getHeaders(contentType, hasAuth);

		const response = await this.http.load(path, {
			method,
			headers,
			payload,
		});

		return (await this.checkResponse(response)) as HTTPApiResponse;
	}

	protected getFullEndpoint<T extends Record<string, string>>(
		...parameters: [...string[], T]
	): string {
		const copiedParameters = [...parameters];
		const options = copiedParameters.pop() as T;

		return configureString(
			this.baseUrl,
			this.path,
			...(copiedParameters as string[]),
			options,
		);
	}

	private async getHeaders(
		contentType: ValueOf<typeof ContentType>,
		hasAuth: boolean,
	): Promise<Headers> {
		const headers = new Headers();
		headers.append(HTTPHeader.CONTENT_TYPE, contentType);

		if (hasAuth) {
			const token = await this.storage.get<string>(StorageKey.TOKEN);

			headers.append(HTTPHeader.AUTHORIZATION, `Bearer ${token ?? ""}`);
		}

		return headers;
	}

	private async checkResponse(response: Response): Promise<Response> | never {
		if (!response.ok) {
			await this.handleError(response);
		}

		return response;
	}

	private async handleError(response: Response): Promise<never> {
		const parsedException = (await response.json().catch(
			(): ServerErrorResponse => ({
				errorType: ServerErrorType.COMMON,
				message: response.statusText,
			}),
		)) as ServerErrorResponse;

		const isCustomException = Boolean(parsedException.errorType);

		throw new HTTPError({
			status: response.status as ValueOf<typeof HTTPCode>,
			errorType: isCustomException
				? parsedException.errorType
				: ServerErrorType.COMMON,
			message: parsedException.message,
			details: "details" in parsedException ? parsedException.details : [],
		});
	}
}

export { BaseHttpApi };
