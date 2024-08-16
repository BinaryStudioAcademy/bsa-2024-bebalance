import { zodResolver } from "@hookform/resolvers/zod";
import {
	type Control,
	type DefaultValues,
	type FieldErrors,
	type FieldValues,
	useForm,
	type UseFormHandleSubmit,
	type ValidationMode,
} from "react-hook-form";

import { type ValidationSchema } from "~/libs/types/types";

type Arguments<T extends FieldValues = FieldValues> = {
	defaultValues: DefaultValues<T>;
	validationSchema: ValidationSchema;
	mode?: keyof ValidationMode;
};

type Results<T extends FieldValues = FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	handleSubmit: UseFormHandleSubmit<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
	defaultValues,
	mode = "onSubmit",
	validationSchema,
}: Arguments<T>): Results<T> => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<T>({
		defaultValues,
		mode,
		resolver: zodResolver(validationSchema),
	});

	return {
		control,
		handleSubmit,
		errors,
	};
};

export { useAppForm };
