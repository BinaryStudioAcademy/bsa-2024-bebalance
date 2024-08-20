import clsx from "clsx";

type Styles = {
	[key: string]: string;
};

/**
 * Combine a string of class names and CSS module classes.
 *
 * @param className - A string of space-separated class names.
 * @param cssModule - An optional object mapping class names to their CSS module equivalents.
 * @returns A string of valid class names, using CSS module classes where applicable.
 *
 * This function takes a string of class names and an optional CSS module object.
 * It splits the class names, checks each against the CSS module (if provided),
 * and returns the appropriate class names joined together.
 * If a class name exists in the CSS module, it uses the mapped value; otherwise, it uses the original class name.
 */
const getValidClassNames = (className: string, cssModule?: Styles): string => {
	const classArray = className.split(/\s+/).filter(Boolean);

	const mappedClasses = classArray.map((cls) => {
		if (cssModule && cssModule[cls]) {
			return cssModule[cls];
		}
		return cls;
	});

	return clsx(mappedClasses);
};

export { getValidClassNames };
