import { config } from "~/libs/packages/config/config";
import { http } from "~/libs/packages/http/http";
import { storage } from "~/libs/packages/storage/storage";

import { AuthApi } from "./auth-api";

const authApi = new AuthApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { authApi };
