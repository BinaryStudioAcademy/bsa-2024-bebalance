import { z } from "zod";

import { CategoriesSavingValidationMessage } from "../enums/enums.js";

const MIN_CATEGORIES_SELECTED = 1;

const categoriesSavingValidationSchema = z.object({
	categories: z
		.array(z.number())
		.min(
			MIN_CATEGORIES_SELECTED,
			CategoriesSavingValidationMessage.AT_LEAST_ONE_CATEGORY,
		),
});

export { categoriesSavingValidationSchema };
