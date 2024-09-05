import { config } from "~/libs/packages/config/config";
import { http } from "~/libs/packages/http/http";
import { storage } from "~/libs/packages/storage/storage";

import { CategoriesApi } from "./categories-api";

const categoriesApi = new CategoriesApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { categoriesApi };
export { APIPath } from "./libs/enums/enums";
export { type CategoryDto, type GetCategoriesDto } from "./libs/types/types";
export { categoriesValidationSchema } from "./libs/validation-schemas/validation-schemas";
