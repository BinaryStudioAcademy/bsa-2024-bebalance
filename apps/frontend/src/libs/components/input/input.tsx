import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { useCallback, useFormController } from "~/libs/hooks/hooks.js";

type Properties<T extends FieldValues> = {
	className: string;
	clickIcon?: (event_: React.BaseSyntheticEvent) => void;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	hasIcon?: string;
	iconSrc?: string;
	inputChange?: (event_: React.BaseSyntheticEvent) => void;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	required?: string;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	className,
	clickIcon,
	control,
	errors,
	hasIcon,
	iconSrc,
	inputChange,
	label,
	name,
	placeholder = "",
	required,
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const handleChange = useCallback(
		(event: React.BaseSyntheticEvent) => {
			field.onChange(event);
			if (inputChange) {
				inputChange(event);
			}
		},
		[field, inputChange],
	);

	return (
		<label className={className}>
			<span className="label">{label}</span>
			<div className="input-content">
				<input
					className="input"
					{...field}
					onChange={handleChange}
					placeholder={placeholder}
					required={Boolean(required) || true}
					type={type}
				/>
				{hasError && <span>{error as string}</span>}
				{Boolean(hasIcon) && (
					<button
						className="btn-icon"
						name={name}
						onClick={clickIcon}
						type="button"
					>
						<img alt="" data-name={name} src={iconSrc} />
					</button>
				)}
			</div>
		</label>
	);
};

export { Input };
