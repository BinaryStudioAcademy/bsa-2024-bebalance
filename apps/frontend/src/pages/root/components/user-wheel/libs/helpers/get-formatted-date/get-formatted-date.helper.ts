import { format } from "date-fns";

import { WHEEL_DATE_FORMAT } from "../../constants/constants.js";

const getFormattedDate = (date: string): string => {
	return format(new Date(date), WHEEL_DATE_FORMAT);
};

export { getFormattedDate };
