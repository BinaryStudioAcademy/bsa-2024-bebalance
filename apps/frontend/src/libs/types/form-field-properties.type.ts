import {
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { type RadioInputOption } from "./radio-input-option.type.js";

type FormFieldProperties<T extends FieldValues> = {
	control: Control<T, null>;
	name: FieldPath<T>;
	options: RadioInputOption[];
};

export { type FormFieldProperties };
export {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
