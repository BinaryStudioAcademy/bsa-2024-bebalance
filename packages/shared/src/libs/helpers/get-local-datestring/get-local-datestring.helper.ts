const getLocalDatestring = (dateUTC: string): string => {
	return new Date(dateUTC).toLocaleString();
};

export { getLocalDatestring };
