import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { useFormController } from "~/libs/hooks/hooks.js";

type Properties<T extends FieldValues> = {
	className: string;
	clickIcon?: (event_: React.BaseSyntheticEvent) => void;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	hasIcon?: string;
	iconSrc?: string;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	className,
	clickIcon,
	control,
	errors,
	hasIcon,
	iconSrc,
	label,
	name,
	placeholder = "",
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	return (
		<label className={className}>
			<span className="label">{label}</span>
			<div className="input-content">
				<input
					className="input"
					{...field}
					placeholder={placeholder}
					type={type}
				/>
				{hasError && <span>{error as string}</span>}
				{Boolean(hasIcon) && (
					<button className="btn-icon" onClick={clickIcon} type="button">
						<img alt="" src={iconSrc} />
					</button>
				)}
			</div>
		</label>
	);
};

export { Input };
