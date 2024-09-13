import { z } from "zod";

import {
	categoriesValidationMessage,
	categoriesValidationRegexRule,
} from "../enums/enums.js";

const categoryIds = z.object({
	categoryIds: z
		.string()
		.trim()
		.regex(
			categoriesValidationRegexRule.QUERY_IS_STRINGIFIED_INTEGERS_ARRAY,
			categoriesValidationMessage.NOT_INTEGER_ARRAY,
		)
		.optional()
		.or(z.literal("")),
});

export { categoryIds };
