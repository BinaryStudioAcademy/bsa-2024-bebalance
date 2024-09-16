import React from "react";

import {
	Button,
	LoaderWrapper,
	PageSwitcher,
	ScreenWrapper,
	ScrollView,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor, DataStatus, RootScreenName } from "~/libs/enums/enums";
import { getScreenWidth } from "~/libs/helpers/helpers";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useNavigation,
	useState,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type NativeStackNavigationProp,
	type RootNavigationParameterList,
} from "~/libs/types/types";
import { type QuizScoresUpdateRequestDto } from "~/packages/quiz/quiz";
import { ScoresEditForm } from "~/screens/edit-wheel-results/libs/components/scores-edit-form/scores-edit-form";
import { actions as quizActions } from "~/slices/quiz/quiz";

import { styles } from "./styles";

const EditWheelResults: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootNavigationParameterList>>();
	const { dataStatus, scores } = useAppSelector((state) => state.quiz);
	const dispatch = useAppDispatch();

	const handleStartPress = useCallback((): void => {
		navigation.navigate(RootScreenName.QUIZ);
	}, [navigation]);

	const handleEditScores = useCallback(
		(payload: QuizScoresUpdateRequestDto) => {
			void dispatch(quizActions.editScores(payload));
		},
		[dispatch],
	);

	const screenWidth = getScreenWidth();

	const [activeTab, setActiveTab] = useState<string>("Edit manually");

	const handleTabChange = useCallback(() => {
		setActiveTab((previousTab) =>
			previousTab === "Edit manually" ? "Retake Quiz" : "Edit manually",
		);
	}, []);

	return (
		<ScreenWrapper
			edges={["top", "left", "right"]}
			style={{ backgroundColor: BaseColor.BG_WHITE }}
		>
			<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
				<View style={[styles.container]}>
					<Text
						preset="subheading"
						style={[globalStyles.ph4, globalStyles.pv4]}
						weight="bold"
					>
						Edit My Wheel Results
					</Text>

					<View style={[globalStyles.mh12, globalStyles.mb8]}>
						<PageSwitcher
							activeTab={activeTab}
							onTabChange={handleTabChange}
							tabs={["Edit manually", "Retake Quiz"]}
						/>
					</View>

					{activeTab === "Edit manually" ? (
						<ScrollView>
							<ScoresEditForm data={scores} onSubmit={handleEditScores} />
						</ScrollView>
					) : (
						<View
							style={[
								globalStyles.mv24,
								globalStyles.pv16,
								globalStyles.flex1,
								globalStyles.justifyContentCenter,
								styles.checkboxForm,
								{ width: screenWidth },
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
					)}
				</View>
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { EditWheelResults };
