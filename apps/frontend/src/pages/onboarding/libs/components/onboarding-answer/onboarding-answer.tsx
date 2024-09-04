import { Input } from "~/libs/components/components.js";
import {
	type FieldPath,
	type FieldValues,
	type InputOption,
	type FormFieldProperties as Properties,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

const OnboardingAnswer = <T extends FieldValues>({
	control,
	name,
	options,
}: { options: InputOption[] } & Omit<
	Properties<T>,
	"options"
>): JSX.Element => {
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
