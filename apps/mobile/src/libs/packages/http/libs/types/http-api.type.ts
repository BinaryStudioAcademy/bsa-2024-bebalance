import { type HTTPApiOptions } from "./types";

type HTTPApi = {
	load(path: string, options: HTTPApiOptions): Promise<Response>;
};

export { type HTTPApi };
