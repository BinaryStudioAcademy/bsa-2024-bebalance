import React from "react";

import {
	Button,
	SliderContent,
	Text,
	View,
} from "~/libs/components/components";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type SliderData } from "~/libs/types/types";
import { actions as quizActions } from "~/slices/quiz/quiz";

import { styles } from "./styles";

type Properties = {
	data: SliderData[];
};

const ScoresEditForm: React.FC<Properties> = ({ data }) => {
	const dispatch = useAppDispatch();
	const [scores, setScores] = useState<SliderData[]>(data);

	useEffect(() => {
		void dispatch(quizActions.getScores());
	}, [dispatch]);

	const handleSaveChange = useCallback(() => {
		//Todo implement edit scores
	}, []);

	const handleSliderChange = useCallback(
		(categoryId: number, value: number) => {
			setScores(
				scores.map((item) =>
					item.categoryId === categoryId ? { ...item, score: value } : item,
				),
			);
		},
		[scores],
	);

	return (
		<View
			style={[
				globalStyles.flex1,
				globalStyles.justifyContentCenter,
				globalStyles.pv16,
				styles.form,
			]}
		>
			<View style={[globalStyles.flex1, globalStyles.alignItemsCenter]}>
				<Text weight="bold">Do you feel any changes in anything?</Text>
				<Text weight="bold">Estimate the fields from 1 to 10</Text>
			</View>
			{data.map((item) => (
				<SliderContent
					id={item.categoryId}
					key={item.categoryId}
					label={item.categoryName}
					onValueChange={handleSliderChange}
					value={item.score}
				/>
			))}
			<View style={[globalStyles.mh32, globalStyles.pt24]}>
				<Button label="SAVE CHANGES" onPress={handleSaveChange} />
			</View>
		</View>
	);
};

export { ScoresEditForm };
