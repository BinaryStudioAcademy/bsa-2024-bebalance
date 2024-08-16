type HTTPApiResponse = Response & {
	json<T = unknown>(): Promise<T> | never;
};

export { type HTTPApiResponse };
