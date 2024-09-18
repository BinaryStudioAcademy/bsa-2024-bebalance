import React from "react";

import {
	CheckboxCategoriesForm,
	LoaderWrapper,
	PageSwitcher,
	ScreenWrapper,
	ScrollView,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor, DataStatus } from "~/libs/enums/enums";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useState,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type CategoriesSelectedRequestDto,
	type ValueOf,
} from "~/libs/types/types";
import { type QuizScoresUpdateRequestDto } from "~/packages/quiz/quiz";
import { actions as quizActions } from "~/slices/quiz/quiz";

import { ScoresEditForm } from "./libs/components/componets";
import { EditWheelResultsTab } from "./libs/enums/enums";
import { styles } from "./styles";

const EditWheelResults: React.FC = () => {
	const [submittedCategoryIds, setSubmittedCategoryIds] = useState<number[]>(
		[],
	);
	const { dataStatus, scores } = useAppSelector((state) => state.quiz);
	const dispatch = useAppDispatch();

	const handleEditScores = useCallback(
		(payload: QuizScoresUpdateRequestDto) => {
			void dispatch(quizActions.editScores(payload));
		},
		[dispatch],
	);

	const [activeTab, setActiveTab] = useState<
		ValueOf<typeof EditWheelResultsTab>
	>(EditWheelResultsTab.EDIT_MANUALLY);

	const handleTabChange = useCallback(() => {
		setActiveTab((previousTab) => {
			return previousTab === EditWheelResultsTab.EDIT_MANUALLY
				? EditWheelResultsTab.RETAKE_QUIZ
				: EditWheelResultsTab.EDIT_MANUALLY;
		});
	}, []);

	const handleRetakeQuizSubmit = useCallback(
		(payload: CategoriesSelectedRequestDto): void => {
			setSubmittedCategoryIds(payload.categoryIds);
			// TODO: send selectedCategoriesSubmissionData to backend
		},
		[],
	);

	return (
		<ScreenWrapper
			edges={["top", "left", "right"]}
			style={styles.screenWrapper}
		>
			<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
				<View style={[globalStyles.pb24, styles.container]}>
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
							tabs={[
								EditWheelResultsTab.EDIT_MANUALLY,
								EditWheelResultsTab.RETAKE_QUIZ,
							]}
						/>
					</View>

					{activeTab === EditWheelResultsTab.EDIT_MANUALLY ? (
						<ScrollView>
							<ScoresEditForm onSubmit={handleEditScores} scores={scores} />
						</ScrollView>
					) : (
						<ScrollView
							style={[
								globalStyles.pt12,
								globalStyles.pb2,
								styles.checkboxForm,
								globalStyles.mh12,
							]}
						>
							<View style={[globalStyles.flex1, globalStyles.alignItemsCenter]}>
								<Text weight="bold">Do you feel any changes in anything?</Text>
								<Text weight="bold">Estimate the fields from 1 to 10</Text>
							</View>
							<View
								style={[
									globalStyles.flex1,
									globalStyles.justifyContentCenter,
									globalStyles.mh24,
									globalStyles.mt16,
								]}
							>
								<CheckboxCategoriesForm
									categories={scores}
									onSubmit={handleRetakeQuizSubmit}
									submitButtonLabel="RETAKE QUIZ"
								/>
							</View>
							<Text color={BaseColor.BLACK}>
								{submittedCategoryIds.join(", ")}
							</Text>
						</ScrollView>
					)}
				</View>
			</LoaderWrapper>
		</ScreenWrapper>
	);
};

export { EditWheelResults };
