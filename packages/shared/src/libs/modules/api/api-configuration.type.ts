import { type HTTP } from "../http/http.js";
import { type Storage } from "../storage/storage.js";

type APIConfiguration = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

export { type APIConfiguration };
