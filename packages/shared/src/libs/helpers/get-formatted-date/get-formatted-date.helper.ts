import { format } from "date-fns";

const WHEEL_DATE_FORMAT = "d MMM yyyy, EEEE";

const getFormattedDate = (date: string): string => {
	return format(date, WHEEL_DATE_FORMAT);
};

export { getFormattedDate };
