import React from "react";

import { RadioGroup, Text } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";
import {
	type Control,
	type FieldErrors,
	type FieldValues,
	type RadioGroupOption,
} from "~/libs/types/types";

import {
	type QuizAnswerDto,
	type QuizFormValues,
	type QuizQuestionDto,
} from "../../types/types";
import { styles } from "./styles";

type Properties<T extends FieldValues> = {
	control: Control<T>;
	errors: FieldErrors<T>;
	question: null | QuizQuestionDto;
};

const Content: React.FC<Properties<QuizFormValues>> = ({
	control,
	errors,
	question,
}) => {
	const mappedAnswersToRadioOptions: RadioGroupOption[] = question?.answers
		? question.answers.map((answer: QuizAnswerDto) => {
				return {
					label: answer.label,
					value: answer.value.toString(),
				};
			})
		: [];

	return (
		<>
			<Text
				preset="subheading"
				style={[globalStyles.mb32, globalStyles.mt12, styles.title]}
			>
				{question?.label}
			</Text>
			<RadioGroup
				control={control}
				errors={errors}
				name="answer"
				options={mappedAnswersToRadioOptions}
			/>
		</>
	);
};

export { Content };
