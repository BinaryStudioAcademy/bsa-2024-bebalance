const convertCategoryNameToCssClassName = (categoryName: string): string => {
	return categoryName.toLowerCase().replaceAll(/\s+/g, "-");
};

export { convertCategoryNameToCssClassName };
