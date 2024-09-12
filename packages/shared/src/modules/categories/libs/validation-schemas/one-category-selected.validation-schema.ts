import { z } from "zod";

import {
	CategoriesValidationMessage,
	CategoriesValidationRule,
} from "../enums/enums.js";

const oneCategorySelected = z.object({
	categoryIds: z
		.number()
		.array()
		.min(
			CategoriesValidationRule.REQUIRE_ONE_CATEGORY,
			CategoriesValidationMessage.ONE_CATEGORY_SELECTED,
		),
});

export { oneCategorySelected };
