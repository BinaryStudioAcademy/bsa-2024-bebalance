import { format } from "date-fns";

const getFormattedDate = (): string => {
	const today = new Date();

	return format(today, "d MMM yyyy, EEEE");
};

export { getFormattedDate };
