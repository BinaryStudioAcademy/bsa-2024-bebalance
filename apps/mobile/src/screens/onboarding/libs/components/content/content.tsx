import React from "react";
import {
	type Control,
	type FieldErrors,
	type FieldValues,
} from "react-hook-form";
import { type OnboardingQuestionResponseDto } from "shared";

import { RadioGroup, Text } from "~/libs/components/components";

import {
	type OnboardingFormValues,
	type RadioGroupValue,
} from "../../types/types";
import { styles } from "./styles";

type Properties<T extends FieldValues> = {
	control: Control<T>;
	errors: FieldErrors<T>;
	question: null | OnboardingQuestionResponseDto;
};

const Content: React.FC<Properties<OnboardingFormValues>> = ({
	control,
	errors,
	question,
}) => {
	let mapData: RadioGroupValue[] = [];

	if (question) {
		mapData = question.answers.map((answer) => ({
			label: answer.label,
			value: answer.id.toString(),
		}));
	}

	return (
		<>
			<Text preset="subheading" style={styles.title}>
				{question?.label}
			</Text>
			<RadioGroup
				control={control}
				errors={errors}
				name="answer"
				options={mapData}
			/>
		</>
	);
};

export { Content };
