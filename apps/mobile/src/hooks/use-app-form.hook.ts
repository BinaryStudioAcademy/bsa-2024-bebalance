import { zodResolver } from "@hookform/resolvers/zod";
import {
	type Control,
	type DefaultValues,
	type FieldErrors,
	type FieldValues,
	type UseFormHandleSubmit,
	type UseFormReset,
	type UseFormSetValue,
	type UseFormWatch,
	type UseFormProps,
	type ValidationMode,
	type UseFormGetValues,
	useForm,
} from "react-hook-form";

import type { ValidationSchema } from "~/app/types/types";

type Parameters<T extends FieldValues = FieldValues> = {
	defaultValues: DefaultValues<T>;
	validationSchema: ValidationSchema;
	mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
	watch: UseFormWatch<T>;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	isValid: boolean;
	handleSubmit: UseFormHandleSubmit<T>;
	setValue: UseFormSetValue<T>;
	isDirty: boolean;
	isSubmitting: boolean;
	isSubmitSuccessful: boolean;
	reset: UseFormReset<T>;
	getValues: UseFormGetValues<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
	defaultValues,
	mode = "onSubmit",
	validationSchema,
}: Parameters<T>): ReturnValue<T> => {
	const parameters: UseFormProps<T> = {
		mode,
		defaultValues,
		resolver: zodResolver(validationSchema),
	};

	const {
		watch,
		control,
		handleSubmit,
		setValue,
		reset,
		getValues,
		formState: { errors, isValid, isDirty, isSubmitting, isSubmitSuccessful },
	} = useForm<T>(parameters);

	return {
		watch,
		control,
		errors,
		isValid,
		isDirty,
		isSubmitting,
		isSubmitSuccessful,
		handleSubmit,
		setValue,
		reset,
		getValues,
	};
};

export { useAppForm };
