import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { CategoriesApi } from "./categories-api.js";

const categoriesApi = new CategoriesApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { actions, reducer } from "./slices/categories.js";
export { categoriesApi };
