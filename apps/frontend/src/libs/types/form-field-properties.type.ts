import {
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { type Options } from "./input-options.type.js";

type FormFieldProperties<T extends FieldValues> = {
	control: Control<T, null>;
	name: FieldPath<T>;
	options: Options[];
};

export { type FormFieldProperties };
export {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
