const createFileKey = (fileName: string): string => {
	return `${Date.now().toString()}-${fileName}`;
};

export { createFileKey };
