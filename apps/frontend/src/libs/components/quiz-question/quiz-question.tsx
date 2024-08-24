import {
	type Control,
	type FieldPath,
	type FieldValues,
} from "~/libs/types/types.js";

import { Input } from "../input/input.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
};

const QuizQuestion = <T extends FieldValues>({ control }: Properties<T>) => {
	return (
		<div className={styles["quiz-question"]}>
			<Input
				control={control}
				label="label"
				name={"name" as FieldPath<T>}
				options={[{ label: "", value: "" }]}
				type="radio"
			/>
		</div>
	);
};

export { QuizQuestion };
