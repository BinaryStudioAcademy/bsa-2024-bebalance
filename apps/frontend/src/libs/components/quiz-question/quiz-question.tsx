import {
	type Control,
	type FieldPath,
	type FieldValues,
	type InputOption,
} from "~/libs/types/types.js";

import { Input } from "../input/input.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	label: string;
	name: string;
	options: InputOption[];
	type: "checkbox" | "email" | "password" | "radio" | "text";
};

const QuizQuestion = <T extends FieldValues>({
	control,
	label,
	name,
	options,
	type,
}: Properties<T>): JSX.Element => {
	return (
		<div className={styles["quiz-question"]}>
			<Input
				control={control}
				label={label}
				name={name as FieldPath<T>}
				options={options}
				type={type}
			/>
		</div>
	);
};

export { QuizQuestion };
