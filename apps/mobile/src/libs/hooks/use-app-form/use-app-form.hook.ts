import { zodResolver } from "@hookform/resolvers/zod";
import {
	type Control,
	type DefaultValues,
	type FieldErrors,
	type FieldValues,
	useForm,
	type UseFormGetValues,
	type UseFormHandleSubmit,
	type UseFormReset,
	type UseFormSetError,
	type UseFormWatch,
	type ValidationMode,
} from "react-hook-form";

import { type ValidationSchema } from "~/libs/types/types";

type Arguments<T extends FieldValues = FieldValues> = {
	defaultValues: DefaultValues<T>;
	mode?: keyof ValidationMode;
	validationSchema: ValidationSchema;
};

type Results<T extends FieldValues = FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	getValues: UseFormGetValues<T>;
	handleSubmit: UseFormHandleSubmit<T>;
	isValid: boolean;
	reset: UseFormReset<T>;
	setError: UseFormSetError<T>;
	watch: UseFormWatch<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
	defaultValues,
	mode = "onSubmit",
	validationSchema,
}: Arguments<T>): Results<T> => {
	const {
		control,
		formState: { errors, isValid },
		getValues,
		handleSubmit,
		reset,
		setError,
		watch,
	} = useForm<T>({
		defaultValues,
		mode,
		resolver: zodResolver(validationSchema),
	});

	return {
		control,
		errors,
		getValues,
		handleSubmit,
		isValid,
		reset,
		setError,
		watch,
	};
};

export { useAppForm };
