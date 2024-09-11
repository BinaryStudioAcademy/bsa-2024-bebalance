const formatToKebabCase = (label: string): string => {
	return label.toLowerCase().replaceAll(" ", "-");
};

export { formatToKebabCase };
