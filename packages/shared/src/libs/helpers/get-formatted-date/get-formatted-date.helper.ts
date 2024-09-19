import { format } from "date-fns";

type DateFormat = "d MMM yyyy, EEEE";

const getFormattedDate = (dateFormat: DateFormat): string => {
	const today = new Date();

	return format(today, dateFormat);
};

export { getFormattedDate };
