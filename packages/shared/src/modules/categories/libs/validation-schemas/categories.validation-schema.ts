import { z } from "zod";

import { CategoriesValidationMessage } from "../enums/enums.js";

const MIN_CATEGORIES_SELECTED = 1;

const categoriesValidationSchema = z.object({
	categories: z
		.array(z.number())
		.min(
			MIN_CATEGORIES_SELECTED,
			CategoriesValidationMessage.AT_LEAST_ONE_CATEGORY,
		),
});

export { categoriesValidationSchema };
