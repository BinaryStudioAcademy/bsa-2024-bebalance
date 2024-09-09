import {
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { type InputOption } from "./input-option.type.js";

type FormFieldProperties<T extends FieldValues> = {
	control: Control<T, null>;
	name: FieldPath<T>;
};

type QuizQuestionPropeties<T extends FieldValues> = {
	control: Control<T, null>;
	label: string;
	name: FieldPath<T>;
	options: InputOption[];
};

export { type FormFieldProperties };
export { type QuizQuestionPropeties };
export {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
