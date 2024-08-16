import { type HTTP, type HTTPOptions } from "./http";

class BaseHttp implements HTTP {
	public load(path: string, options: HTTPOptions): Promise<Response> {
		const { method, payload, headers } = options;

		return fetch(path, {
			method,
			headers,
			body: payload,
		});
	}
}

export { BaseHttp };
