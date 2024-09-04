import {
	type FieldPath,
	type FieldValues,
	type QuizQuestionPropeties as Properties,
} from "~/libs/types/types.js";

import { Input } from "../input/input.js";
import styles from "./styles.module.css";

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
				type="radio"
			/>
		</div>
	);
};

export { QuizQuestion };
