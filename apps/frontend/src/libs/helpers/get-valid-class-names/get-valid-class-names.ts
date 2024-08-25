import clsx, { type ClassValue } from "clsx";

const getValidClassNames = (...className: ClassValue[]): string => {
	return clsx(...className);
};

export { getValidClassNames };
