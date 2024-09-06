const getFileKey = (url: string): string => {
	return url.split("/").pop() as string;
};

export { getFileKey };
