import { format } from "date-fns";

type DateFormat = "d MMM yyyy, EEEE";

const getFormattedDate = (date: Date, dateFormat: DateFormat): string => {
	return format(date, dateFormat);
};

export { getFormattedDate };
