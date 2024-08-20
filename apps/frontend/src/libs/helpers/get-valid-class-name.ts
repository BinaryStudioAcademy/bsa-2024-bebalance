import clsx from "clsx";

/**
 * Generates a valid class name string by combining a CSS module style with additional class names.
 *
 * @param {string | undefined} baseClass - The primary class name, which can be a single class or a combination of classes.
 * @param {string} [additionalClass] - Optional additional class names to be appended.
 * @returns {string} A string of combined class names, ready to be used in a className prop.
 */
const getValidClassNames = (
	baseClass: string | undefined,
	additionalClass?: string,
): string => {
	return clsx(baseClass, additionalClass);
};

export { getValidClassNames };
