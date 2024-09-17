import { format } from "date-fns";

const getFormattedDate = (dateFormat: string): string => {
	const today = new Date();

	return format(today, dateFormat);
};

export { getFormattedDate };
