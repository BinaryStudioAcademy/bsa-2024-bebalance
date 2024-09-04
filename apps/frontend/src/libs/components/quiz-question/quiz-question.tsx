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
};

const QuizQuestion = <T extends FieldValues>({
	control,
	label,
	name,
	options,
}: Properties<T>): JSX.Element => {
	return (
		<div className={styles["quiz-question"]}>
			<Input
				control={control}
				label={label}
				name={name as FieldPath<T>}
				options={options}
			/>
		</div>
	);
};

export { QuizQuestion };
