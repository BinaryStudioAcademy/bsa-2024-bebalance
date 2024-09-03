import {
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

type FormFieldProperties<T extends FieldValues> = {
	control: Control<T, null>;
	name: FieldPath<T>;
	options?: { label: string; value: string }[];
};

export { type FormFieldProperties };
export {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
