import { BaseHttp } from "./base-http.package";

const http = new BaseHttp();

export { http };
export { HTTPCode, HTTPHeader } from "./libs/enums/enums";
export {
	type HTTPApi,
	type HTTPApiOptions,
	type HTTPApiResponse,
	type HTTPOptions,
} from "./libs/types/types";
export { type HTTP } from "shared";
