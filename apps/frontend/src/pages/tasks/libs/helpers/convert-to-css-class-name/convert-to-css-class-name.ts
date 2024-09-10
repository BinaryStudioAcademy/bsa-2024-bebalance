const convertToCssClassName = (categoryName: string): string => {
	return categoryName.toLowerCase().replaceAll(/\s+/g, "-");
};

export { convertToCssClassName };
