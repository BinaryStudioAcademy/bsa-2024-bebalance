const categoriesValidationRegexRule = {
	QUERY_IS_STRINGIFIED_INTEGERS_ARRAY: new RegExp(
		/^\[\s*(\d+\s*,\s*)*\d+\s*]$/,
	),
};

export { categoriesValidationRegexRule };
