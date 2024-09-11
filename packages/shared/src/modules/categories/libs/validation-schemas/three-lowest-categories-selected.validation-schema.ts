import { z } from "zod";

import {
	CategoriesValidationMessage,
	CategoriesValidationRule,
} from "../enums/enums.js";

const threeCategoriesSelected = z.object({
	categoryIds: z
		.number()
		.array()
		.min(
			CategoriesValidationRule.REQUIRE_THREE_CATEGORIES,
			CategoriesValidationMessage.THREE_CATEGORIES_SELECTED,
		),
});

export { threeCategoriesSelected };
