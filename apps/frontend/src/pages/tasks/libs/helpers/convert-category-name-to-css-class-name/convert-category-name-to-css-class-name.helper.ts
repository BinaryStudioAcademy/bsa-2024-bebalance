const convertCategyNameToCssClassName = (categoryName: string): string => {
	return categoryName.toLowerCase().replaceAll(/\s+/g, "-");
};

export { convertCategyNameToCssClassName };
