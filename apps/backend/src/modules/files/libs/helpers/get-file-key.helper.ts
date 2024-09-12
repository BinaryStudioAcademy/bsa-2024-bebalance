const getFileKeyFromUrl = (url: string): string => {
	return url.split("/").pop() as string;
};

export { getFileKeyFromUrl };
