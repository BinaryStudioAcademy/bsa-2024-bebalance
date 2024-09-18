import { type BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import React from "react";

import {
	Button,
	MultipleSliderInput,
	Text,
	View,
} from "~/libs/components/components";
import { BottomTabScreenName } from "~/libs/enums/enums";
import { useAppForm, useCallback, useNavigation } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type BottomTabNavigationParameterList } from "~/libs/types/types";
import {
	type QuizScoresGetAllItemResponseDto,
	type QuizScoresUpdateRequestDto,
	updateScoresValidationSchema,
} from "~/packages/quiz/quiz";

import { SCORE_FORM_DEFAULT_VALUES } from "../../constants/constants";
import { styles } from "./styles";

type Properties = {
	onSubmit: (payload: QuizScoresUpdateRequestDto) => void;
	scores: QuizScoresGetAllItemResponseDto[];
};

const ScoresEditForm: React.FC<Properties> = ({ onSubmit, scores }) => {
	const { control, handleSubmit } = useAppForm<QuizScoresUpdateRequestDto>({
		defaultValues: SCORE_FORM_DEFAULT_VALUES,
		validationSchema: updateScoresValidationSchema,
	});

	const navigation =
		useNavigation<BottomTabNavigationProp<BottomTabNavigationParameterList>>();

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit((formData) => {
			onSubmit(formData);
			navigation.navigate(BottomTabScreenName.WHEEL_SCREEN);
		})();
	}, [handleSubmit, onSubmit, navigation]);

	const sliderValues = scores.map(({ categoryId, categoryName, score }) => {
		return {
			id: categoryId,
			label: categoryName,
			value: score,
		};
	});

	return (
		<View
			style={[
				globalStyles.flex1,
				globalStyles.pv16,
				globalStyles.mh12,
				styles.form,
			]}
		>
			<View style={globalStyles.alignItemsCenter}>
				<Text weight="bold">Do you feel any changes in anything?</Text>
				<Text weight="bold">Estimate the fields from 1 to 10</Text>
			</View>
			<MultipleSliderInput
				control={control}
				name="items"
				scores={sliderValues}
			/>
			<View style={[globalStyles.mh32, globalStyles.pt24]}>
				<Button label="SAVE CHANGES" onPress={handleFormSubmit} />
			</View>
		</View>
	);
};

export { ScoresEditForm };
