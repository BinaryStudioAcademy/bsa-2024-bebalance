const MILLISECONDS_PER_MINUTE = 60_000;

const getLocalDate = (dateUTC: string): Date => {
	const utcDate = new Date(dateUTC);
	const offset = utcDate.getTimezoneOffset();

	return new Date(utcDate.getTime() - offset * MILLISECONDS_PER_MINUTE);
};

export { getLocalDate };
