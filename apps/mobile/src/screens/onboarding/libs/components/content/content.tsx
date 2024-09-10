import React from "react";

import { RadioGroup, Text } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/global-styles/global-styles";
import {
	type Control,
	type FieldErrors,
	type FieldValues,
	type RadioGroupOption,
} from "~/libs/types/types";

import {
	type OnboardingAnswerDto,
	type OnboardingFormValues,
	type OnboardingQuestionResponseDto,
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
	const mappedAnswersToRadioOptions: RadioGroupOption[] = question?.answers
		? question.answers.map((answer: OnboardingAnswerDto) => {
				return {
					label: answer.label,
					value: answer.id.toString(),
				};
			})
		: [];

	return (
		<>
			<Text size="xl" style={styles.title} weight="bold">
				{question?.label}
			</Text>
			<RadioGroup
				control={control}
				errors={errors}
				itemContainerStyle={globalStyles.mb16}
				name="answer"
				options={mappedAnswersToRadioOptions}
			/>
		</>
	);
};

export { Content };
