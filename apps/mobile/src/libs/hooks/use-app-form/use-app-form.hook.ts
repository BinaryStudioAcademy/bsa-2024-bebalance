import { zodResolver } from "@hookform/resolvers/zod";
import {
	type Control,
	type DefaultValues,
	type FieldErrors,
	type FieldValues,
	useForm,
	type UseFormHandleSubmit,
	type UseFormSetError,
	type UseFormSetValue,
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
	handleSubmit: UseFormHandleSubmit<T>;
	setError: UseFormSetError<T>;
	setValue: UseFormSetValue<T>;
	watch: UseFormWatch<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
	defaultValues,
	mode = "onSubmit",
	validationSchema,
}: Arguments<T>): Results<T> => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		setError,
		setValue,
		watch,
	} = useForm<T>({
		defaultValues,
		mode,
		resolver: zodResolver(validationSchema),
	});

	return {
		control,
		errors,
		handleSubmit,
		setError,
		setValue,
		watch,
	};
};

export { useAppForm };
