import styles from "./styles.module.css";

type Properties = {
	checked?: boolean;
	label: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onClick?: () => void;
	readOnly?: boolean;
	value?: string;
};

const QuizCategoriesSelectionCheckbox: React.FC<Properties> = ({
	checked,
	label,
	onChange,
	onClick,
	readOnly,
	value,
}: Properties) => {
	return (
		<label className={styles["input-container"]}>
			<input
				checked={checked}
				name="category"
				onChange={onChange}
				onClick={onClick}
				readOnly={readOnly}
				type="checkbox"
				value={value}
			/>
			<span className={styles["input-checkmark"]} />
			{label}
		</label>
	);
};

export { QuizCategoriesSelectionCheckbox };
