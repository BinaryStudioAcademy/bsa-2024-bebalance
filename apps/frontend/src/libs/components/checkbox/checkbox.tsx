import { ZERO_INDEX } from "~/libs/constants/constants.js";
import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import {
	type FieldValues,
	type FormFieldProperties,
	type InputOption,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	label: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	options: InputOption[];
	variant: "gradient" | "oval";
} & FormFieldProperties<T>;

const Checkbox = <T extends FieldValues>({
	control,
	label,
	name,
	options,
	variant,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });
	const { onChange: onFieldChange, value } = field;

	//
	const handleCheckboxesChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const isChecked = event.target.checked;
			const inputValue =
				variant === "gradient"
					? Number(event.target.value)
					: event.target.value;

			if (isChecked) {
				onFieldChange([...value, inputValue]);
			} else {
				onFieldChange(
					(value as (number | string)[]).filter(
						(value) => value !== inputValue,
					),
				);
			}
		},
		[onFieldChange, value, variant],
	);

	const handleSingleCheckboxChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			onFieldChange(event);
			// onChange?.(event);
		},
		[onFieldChange],
	);
	//

	// const handleCheckboxesChange = useCallback(
	// 	(event: React.ChangeEvent<HTMLInputElement>): void => {
	// 		const isChecked = event.target.checked;
	// 		const inputValue = event.target.value;

	// 		if (isChecked) {
	// 			onFieldChange([...value, inputValue]);
	// 		} else {
	// 			onFieldChange(
	// 				(value as string[]).filter((value) => value !== inputValue),
	// 			);
	// 		}

	// 		onChange?.(event);
	// 	},
	// 	[onChange, onFieldChange, value],
	// );

	// const handleSingleCheckboxChange = useCallback(
	// 	(event: React.ChangeEvent<HTMLInputElement>): void => {
	// 		onFieldChange(event);
	// 		onChange?.(event);
	// 	},
	// 	[onChange, onFieldChange],
	// );

	// return (
	// 	<section>
	// 		{options?.length &&
	// 			options.map(({ label, value: optionValue }) => {
	// 				return (
	// 					<label className={styles["container"]} key={optionValue}>
	// 						<input
	// 							checked={(value as string[]).includes(optionValue)}
	// 							className={styles["checkbox"]}
	// 							onChange={handleCheckboxesChange}
	// 							type="checkbox"
	// 							value={optionValue}
	// 						/>
	// 						<span className={styles["checkmark"]} />
	// 						{label}
	// 					</label>
	// 				);
	// 			})}
	// 		{!options?.length && (
	// 			<label className={styles["container"]}>
	// 				<input
	// 					{...field}
	// 					checked={Boolean(value)}
	// 					className={styles["checkbox"]}
	// 					onChange={handleSingleCheckboxChange}
	// 					type="checkbox"
	// 				/>
	// 				<span className={styles["checkmark"]} />
	// 				{label}
	// 			</label>
	// 		)}
	// 	</section>

	///=/////=///==//=

	// const handleCheckboxesChange = useCallback(
	// 	(event: React.ChangeEvent<HTMLInputElement>): void => {
	// 		const isChecked = event.target.checked;
	// 		if (isChecked) {
	// 			onChange([...value, inputValue]);
	// 		} else {
	// 			onChange((value as number[]).filter((value) => value !== inputValue));
	// 		}
	// 	},
	// 	[onChange, value],
	// );

	return (
		<>
			<label className={styles["input-wrapper"]}>
				{variant === "gradient" && (
					<p className={styles["question"]}>{label}</p>
				)}
				<div className={styles["input-container"]}>
					{options.map((option) => {
						const isChecked =
							variant === "gradient"
								? (value as number[]).includes(Number(option.value))
								: (value as string[]).includes(String(option.value));

						return variant === "gradient" ? (
							<div
								className={styles["gradient-border-container"]}
								key={option.value}
							>
								<div className={styles["gradient-border-content"]}>
									<label className={styles["label"]} key={option.value}>
										<input
											checked={isChecked}
											className={styles["checkbox"]}
											onChange={handleCheckboxesChange}
											type="checkbox"
											value={option.value}
										/>
										<span className={styles["input-checkmark"]} />
										{option.label}
									</label>
								</div>
							</div>
						) : (
							<label className={styles["container"]} key={option.value}>
								<input
									checked={isChecked}
									className={styles["checkbox"]}
									onChange={handleCheckboxesChange}
									type="checkbox"
									value={option.value}
								/>
								<span className={styles["checkmark"]} />
								{option.label}
							</label>
						);
					})}
				</div>
			</label>
			{options.length === ZERO_INDEX && (
				<label className={styles["container"]}>
					<input
						{...field}
						checked={Boolean(value)}
						className={styles["checkbox"]}
						onChange={handleSingleCheckboxChange}
						type="checkbox"
					/>
					<span className={styles["checkmark"]} />
					{label}
				</label>
			)}
		</>
	);
};

export { Checkbox };
