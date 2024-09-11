import React from "react";

import {
	Button,
	ScreenWrapper,
	ScrollView,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor, RootScreenName } from "~/libs/enums/enums";
import { useAppSelector, useCallback, useNavigation } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type NativeStackNavigationProp,
	type RootNavigationParameterList,
} from "~/libs/types/types";
import { ScoresEditForm } from "~/screens/edit-wheel-results/components/scores-edit-form/scores-edit-form";

import { styles } from "./styles";

const EditWheelResults: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootNavigationParameterList>>();
	const scores = useAppSelector((state) => state.quiz.scores);

	const handleStartPress = useCallback((): void => {
		navigation.navigate(RootScreenName.QUIZ);
	}, [navigation]);

	return (
		<ScreenWrapper
			edges={["top", "left", "right"]}
			style={{ backgroundColor: BaseColor.BG_WHITE }}
		>
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
				<ScoresEditForm data={scores} />
				<View
					style={[
						globalStyles.mv24,
						globalStyles.pv16,
						globalStyles.flex1,
						globalStyles.justifyContentCenter,
						styles.checkboxForm,
					]}
				>
					<View style={[globalStyles.flex1, globalStyles.alignItemsCenter]}>
						<Text weight="bold">Do you feel any changes in anything?</Text>
						<Text weight="bold">Estimate the fields from 1 to 10</Text>
					</View>
					<Text>CheckBox Form</Text>
					<View style={[globalStyles.mh32, globalStyles.pt24]}>
						<Button label="RETAKE QUIZ" onPress={handleStartPress} />
					</View>
				</View>
			</ScrollView>
		</ScreenWrapper>
	);
};

export { EditWheelResults };
