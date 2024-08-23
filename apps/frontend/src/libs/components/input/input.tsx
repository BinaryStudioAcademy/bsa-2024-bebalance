import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors?: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	options?: { label: string; value: string }[];
	placeholder?: string;
	type?: "email" | "password" | "radio" | "text";
};

const Input = <T extends FieldValues>({
	control,
	errors,
	label,
	name,
	options,
	placeholder = "",
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors?.[name]?.message;
	const hasError = Boolean(error);
	const isRadioWithOptions = type === "radio" && options?.length;

	const handleRadioChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			field.onChange(event.target.value);
		},
		[field],
	);

	return (
		<label className={styles["input-wrapper"]}>
			<span
				className={getValidClassNames(
					styles["input-label"],
					options && styles["radio-label"],
				)}
			>
				{label}
			</span>
			<div className={styles["input-container"]}>
				{isRadioWithOptions ? (
					<div className={styles["radio-container"]}>
						{options.map((option) => (
							<label className={styles["radio-option"]} key={option.value}>
								<input
									checked={field.value === option.value}
									className={styles["radio-field"]}
									onChange={handleRadioChange}
									type="radio"
									value={option.value}
								/>
								{option.label}
							</label>
						))}
					</div>
				) : (
					<input
						className={getValidClassNames(styles["input-field"])}
						{...field}
						placeholder={placeholder}
						type={type}
					/>
				)}
			</div>

			{hasError && (
				<span className={styles["input-error"]}>{error as string}</span>
			)}
		</label>
	);
};

export { Input };
