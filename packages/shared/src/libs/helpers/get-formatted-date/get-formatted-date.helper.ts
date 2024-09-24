import { format } from "date-fns";

const WHEEL_DATE_FORMAT = "d MMM yyyy, EEEE";

const getFormattedDate = (inputDate?: string): string => {
	const date = inputDate ? new Date(inputDate) : new Date();

	return format(date, WHEEL_DATE_FORMAT);
};

export { getFormattedDate };
