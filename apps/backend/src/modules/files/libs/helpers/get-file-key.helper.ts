const getFileKeyByUrl = (url: string): string => {
	return url.split("/").pop() as string;
};

export { getFileKeyByUrl };
