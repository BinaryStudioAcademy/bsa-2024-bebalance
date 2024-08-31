import { Input } from "~/libs/components/components.js";
import {
	type FieldPath,
	type FieldValues,
	type FormFieldProperties as Properties,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

const OnboardingAnswer = <T extends FieldValues>({
	control,
	name,
	options = [],
}: Properties<T>): JSX.Element => {
	return (
		<div className={styles["onboarding-answer"]}>
			<Input
				control={control}
				hasVisuallyHiddenLabel
				label="answer"
				name={name as FieldPath<T>}
				options={options}
				type="radio"
			/>
		</div>
	);
};

export { OnboardingAnswer };
