import {
	type Control,
	type FieldErrors,
	type FieldValues,
} from "react-hook-form";
import {
	type OnboardingFormValues,
	type RadioGroupValue,
} from "../../types/types";

import {styles} from "./styles";

import type { OnboardingQuestionResponseDto } from "shared";

import {RadioGroup, Text} from "~/libs/components/components";


type Properties<T extends FieldValues> = {
	question: OnboardingQuestionResponseDto | null;
	control: Control<T>;
	errors: FieldErrors<T>;
};


const Content: React.FC<Properties<OnboardingFormValues>> = ({question, control, errors}) => {
	let mapData: RadioGroupValue[] = [];

	if (question) {
		mapData = question.answers.map((answer) => ({
			label: answer.label,
			value: answer.id,
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
				name={"answer"}
				options={mapData}
			/>
		</>
	);

}

export { Content };
