import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	icon?: string;
	iconPosition?: "left" | "right";
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "text";
};

const Input = <T extends FieldValues>({
	control,
	errors,
	icon,
	iconPosition = "left",
	label,
	name,
	placeholder = "",
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	return (
		<label className={styles["input-wrapper"]}>
			<span className={styles["input-label"]}>{label}</span>
			<div className={styles["input-container"]}>
				{icon && (
					<img
						alt="icon"
						className={getValidClassNames(
							styles["icon"],
							iconPosition === "left"
								? styles["icon-left"]
								: styles["icon-right"],
						)}
						src={icon}
					/>
				)}
				<input
					className={getValidClassNames(
						styles["input__field"],
						icon && iconPosition === "left"
							? styles["input__field--with-icon-left"]
							: styles["input__field--with-icon-right"],
					)}
					{...field}
					placeholder={placeholder}
					type={type}
				/>
			</div>

			{hasError && (
				<span className={styles["input-error"]}>{error as string}</span>
			)}
		</label>
	);
};

export { Input };
