type APIPreHandlerResponsePayload = {
	error: Error;
};

type APIPreHandlerResponse = APIPreHandlerResponsePayload | undefined;

export { type APIPreHandlerResponse };
