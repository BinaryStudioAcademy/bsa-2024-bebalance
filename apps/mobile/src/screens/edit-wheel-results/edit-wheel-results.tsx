import React from "react";

import {
	CheckboxCategoriesForm,
	ScreenWrapper,
	ScrollView,
	Text,
	View,
	WhiteBackgroundWrapper,
} from "~/libs/components/components";
import { RootScreenName } from "~/libs/enums/enums";
import { useAppSelector, useCallback, useNavigation } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type NativeStackNavigationProp,
	type RootNavigationParameterList,
	type SliderData,
} from "~/libs/types/types";
import { ScoresEditForm } from "~/screens/edit-wheel-results/components/scores-edit-form/scores-edit-form";

import { styles } from "./styles";

const ZERO_LENGTH = 0;

const mockData: SliderData[] = [
	{ categoryId: 1, categoryName: "Physical", score: 3 },
	{ categoryId: 2, categoryName: "Work", score: 6 },
	{ categoryId: 3, categoryName: "Friends", score: 6 },
	{ categoryId: 4, categoryName: "Love", score: 6 },
	{ categoryId: 5, categoryName: "Money", score: 6 },
	{ categoryId: 6, categoryName: "Free time", score: 6 },
	{ categoryId: 7, categoryName: "Spiritual", score: 6 },
	{ categoryId: 8, categoryName: "Mental", score: 6 },
];

const EditWheelResults: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootNavigationParameterList>>();
	const scores = useAppSelector((state) => state.quiz.scores);

	const displayData = scores.length > ZERO_LENGTH ? scores : mockData;

	const handleStartPress = useCallback((): void => {
		navigation.navigate(RootScreenName.QUIZ);
	}, [navigation]);

	return (
		<WhiteBackgroundWrapper>
			<ScreenWrapper edges={["top", "left", "right"]}>
				<ScrollView
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					style={[globalStyles.mh12, styles.container]}
				>
					<Text
						preset="subheading"
						style={[globalStyles.ph4, globalStyles.pv4]}
						weight="bold"
					>
						Edit My Wheel Results
					</Text>
					<ScoresEditForm data={displayData} />
					<View
						style={[
							globalStyles.mv24,
							globalStyles.pv16,
							globalStyles.flex1,
							globalStyles.justifyContentCenter,
							styles.checkboxForm,
						]}
					>
						<View
							style={[
								globalStyles.flex1,
								globalStyles.flexGrow1,
								globalStyles.alignItemsCenter,
							]}
						>
							<Text weight="bold">Do you feel any changes in anything?</Text>
							<Text weight="bold">
								Choose the fields you want to reestimate
							</Text>
						</View>
						<View style={[globalStyles.mh32, globalStyles.pt24]}>
							<CheckboxCategoriesForm
								categories={scores}
								onSubmit={handleStartPress}
								submitButtonName="RETAKE QUIZ"
							/>
						</View>
					</View>
				</ScrollView>
			</ScreenWrapper>
		</WhiteBackgroundWrapper>
	);
};

export { EditWheelResults };
