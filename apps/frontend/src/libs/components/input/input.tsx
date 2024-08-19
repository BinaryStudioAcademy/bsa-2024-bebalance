import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "text";
};

const Input = <T extends FieldValues>({
	control,
	errors,
	label,
	name,
	placeholder = "",
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	return (
		<label className={styles["input-container"]}>
			<span className={styles["input-label"]}>{label}</span>
			<input
				className={styles["input"]}
				{...field}
				placeholder={placeholder}
				type={type}
			/>
			{hasError && (
				<span className={styles["input-error"]}>{error as string}</span>
			)}
		</label>
	);
};

export { Input };
