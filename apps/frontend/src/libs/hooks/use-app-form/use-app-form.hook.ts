import { zodResolver } from "@hookform/resolvers/zod";
import {
	type Control,
	type DefaultValues,
	type FieldErrors,
	type FieldValues,
	type UseFormGetValues,
	type UseFormHandleSubmit,
	type UseFormProps,
	type UseFormSetError,
	type UseFormSetValue,
	type ValidationMode,
} from "react-hook-form";
import { useForm } from "react-hook-form";

import { type ValidationSchema } from "~/libs/types/types.js";

type Parameters<T extends FieldValues = FieldValues> = {
	defaultValues: DefaultValues<T>;
	mode?: keyof ValidationMode;
	validationSchema?: ValidationSchema;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	getValues: UseFormGetValues<T>;
	handleSubmit: UseFormHandleSubmit<T>;
	isValid: boolean;
	reset: (defaultValues?: DefaultValues<T>) => void;
	setError: UseFormSetError<T>;
	setValue: UseFormSetValue<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
	defaultValues,
	mode = "onSubmit",
	validationSchema,
}: Parameters<T>): ReturnValue<T> => {
	let parameters: UseFormProps<T> = {
		defaultValues,
		mode,
	};

	if (validationSchema) {
		parameters = {
			...parameters,
			resolver: zodResolver(validationSchema),
		};
	}

	const {
		control,
		formState: { errors, isValid },
		getValues,
		handleSubmit,
		reset,
		setError,
		setValue,
	} = useForm<T>(parameters);

	return {
		control,
		errors,
		getValues,
		handleSubmit,
		isValid,
		reset,
		setError,
		setValue,
	};
};

export { useAppForm };
