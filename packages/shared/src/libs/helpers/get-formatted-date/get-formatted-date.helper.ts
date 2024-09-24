import { format } from "date-fns";

type DateFormat = "d MMM yyyy, EEEE";

const getFormattedDate = (dateFormat: DateFormat, date: string): string => {
	return format(date, dateFormat);
};

export { getFormattedDate };
