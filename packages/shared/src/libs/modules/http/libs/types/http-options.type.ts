import { type HTTPMethodType } from "./http-method.type.js";

type HTTPOptions = {
	headers: Headers;
	method: HTTPMethodType;
	payload: BodyInit | null;
};

export { type HTTPOptions };
