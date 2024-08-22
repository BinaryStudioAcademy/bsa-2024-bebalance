import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Input } from "../components.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
};

const QuizQuestion = <T extends FieldValues>({
	control,
	errors,
}: Properties<T>) => {
	return (
		<div className={styles["quiz-question"]}>
			<Input
				control={control}
				errors={errors}
				label="label"
				name={"name" as FieldPath<T>}
				options={[{ label: "", value: "" }]}
				type="radio"
			/>
		</div>
	);
};

export { QuizQuestion };
