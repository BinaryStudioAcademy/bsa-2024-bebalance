import { z } from "zod";

import {
	CategoriesValidationMessage,
	CategoriesValidationRegexRule,
} from "../enums/enums.js";

const categoryIds = z.object({
	categoryIds: z
		.string()
		.trim()
		.regex(
			CategoriesValidationRegexRule.QUERY_IS_STRINGIFIED_INTEGERS_ARRAY,
			CategoriesValidationMessage.NOT_INTEGER_ARRAY,
		)
		.optional()
		.or(z.literal("")),
});

export { categoryIds };
