import { type HTTP } from "../http/http.js";
import { type Storage } from "../storage/storage.js";

type ApiConfiguration = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

export { type ApiConfiguration };
