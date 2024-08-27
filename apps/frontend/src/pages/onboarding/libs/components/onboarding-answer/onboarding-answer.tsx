import React from "react";

import { Input } from "~/libs/components/components.js";
import {
	type Control,
	type FieldPath,
	type FieldValues,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

type AnswerProperties<T extends FieldValues> = {
	control: Control<T, null>;
	name: FieldPath<T>;
	options?: { label: string; value: string }[];
};

const OnboardingAnswer = <T extends FieldValues>({
	control,
	name,
	options = [],
}: AnswerProperties<T>) => {
	return (
		<div className={styles["onboarding-answer"]}>
			<Input
				control={control}
				label=""
				name={name as FieldPath<T>}
				options={options}
				type="radio"
			/>
		</div>
	);
};

export { OnboardingAnswer };
