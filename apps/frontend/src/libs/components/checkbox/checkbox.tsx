import Checkmark from "~/assets/img/checkmark.svg?react";
import { ZERO_INDEX } from "~/libs/constants/constants.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import {
	type FieldValues,
	type FormFieldProperties,
	type InputOption,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues, OptionValueT extends number | string> = {
	hasVisuallyHiddenLabel?: boolean;
	isRounded?: boolean;
	label: string;
	layout?: "column" | "wrap";
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	options: InputOption<OptionValueT>[];
} & FormFieldProperties<T>;

const Checkbox = <T extends FieldValues, OptionValueT extends number | string>({
	control,
	hasVisuallyHiddenLabel = false,
	isRounded = false,
	label,
	layout = "wrap",
	name,
	onChange,
	options,
}: Properties<T, OptionValueT>): JSX.Element => {
	const { field } = useFormController({ control, name });
	const { onChange: onFieldChange, value } = field;

	const layoutStyle = styles[`${layout}-layout`];
	const variantStyle = isRounded
		? styles["rounded-checkbox"]
		: styles["rectangular-checkbox"];

	const handleCheckboxesChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const isChecked = event.target.checked;
			const inputValue = (value as unknown[]).every(
				(value) => typeof value === "number",
			)
				? Number(event.target.value)
				: event.target.value;

			if (isChecked) {
				onFieldChange([...value, inputValue]);
			} else {
				onFieldChange(
					(value as number[]).filter((value) => value !== inputValue),
				);
			}

			onChange?.(event);
		},
		[onFieldChange, onChange, value],
	);

	const handleSingleCheckboxChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			onFieldChange(event);
			onChange?.(event);
		},
		[onFieldChange, onChange],
	);

	return (
		<section className={styles["container"]}>
			<p
				className={getValidClassNames(
					styles["main-label"],
					hasVisuallyHiddenLabel && "visually-hidden",
				)}
			>
				{label}
			</p>
			<section
				className={getValidClassNames(styles["options-container"], layoutStyle)}
			>
				{options.length > ZERO_INDEX &&
					options.map((option) => {
						const isChecked = (value as unknown[]).includes(option.value);

						return (
							<div
								className={getValidClassNames(
									styles["checkbox-gradient-border"],
									variantStyle,
								)}
								key={option.value}
							>
								<label
									className={getValidClassNames(
										styles["checkbox-container"],
										variantStyle,
									)}
								>
									<input
										checked={isChecked}
										className={styles["checkbox"]}
										onChange={handleCheckboxesChange}
										type="checkbox"
										value={option.value}
									/>
									<span className={styles["checkmark-container"]}>
										<Checkmark className={styles["checkmark"]} />
									</span>
									{option.label}
								</label>
							</div>
						);
					})}
				{options.length === ZERO_INDEX && (
					<div
						className={getValidClassNames(
							styles["checkbox-gradient-border"],
							variantStyle,
						)}
					>
						<label
							className={getValidClassNames(
								styles["checkbox-container"],
								variantStyle,
							)}
						>
							<input
								checked={Boolean(value)}
								className={styles["checkbox"]}
								onChange={handleSingleCheckboxChange}
								type="checkbox"
								value={value}
							/>
							<span className={styles["checkmark-container"]}>
								<Checkmark className={styles["checkmark"]} />
							</span>
							{label}
						</label>
					</div>
				)}
			</section>
		</section>
	);
};

export { Checkbox };
