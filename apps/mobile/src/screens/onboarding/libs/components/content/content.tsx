import React from "react";
import {
	type Control,
	type FieldErrors,
	type FieldValues,
} from "react-hook-form";

import { RadioGroup, Text } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/global-styles/global-styles";

import {
	type OnboardingAnswerDto,
	type OnboardingFormValues,
	type OnboardingQuestionResponseDto,
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
	const mapData: RadioGroupValue[] = question?.answers
		? question.answers.map((answer: OnboardingAnswerDto) => ({
				label: answer.label,
				value: answer.id.toString(),
			}))
		: [];

	return (
		<>
			<Text preset="subheading" style={[styles.title, globalStyles.mv48]}>
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
