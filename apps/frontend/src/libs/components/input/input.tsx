import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import styles from "~/libs/components/css/input.module.css";
import { useFormController } from "~/libs/hooks/hooks.js";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	onClick?: (event_: React.BaseSyntheticEvent) => void;
	placeholder?: string;
	required?: boolean;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	control,
	errors,
	label,
	name,
	placeholder = "",
	required = false,
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	return (
		<label className={styles["input-container"]}>
			<span className={styles["label"]}>{label}</span>
			<div className={styles["input-content"]}>
				<input
					className={styles["input"]}
					{...field}
					placeholder={placeholder}
					required={required}
					type={type}
				/>
				{hasError && <span>{error as string}</span>}
			</div>
		</label>
	);
};

export { Input };
