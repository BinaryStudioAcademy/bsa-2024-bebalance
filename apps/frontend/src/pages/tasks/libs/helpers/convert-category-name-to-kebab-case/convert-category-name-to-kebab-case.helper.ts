const convertCategoryNameToKebabCase = (categoryName: string): string => {
	return categoryName.toLowerCase().replaceAll(/\s+/g, "-");
};

export { convertCategoryNameToKebabCase };
