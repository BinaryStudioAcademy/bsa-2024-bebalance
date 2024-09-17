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
import { type CategoriesSelectedRequestDto } from "~/libs/types/types";
import { type QuizScoresUpdateRequestDto } from "~/packages/quiz/quiz";
import { ScoresEditForm } from "~/screens/edit-wheel-results/libs/components/scores-edit-form/scores-edit-form";
import { actions as quizActions } from "~/slices/quiz/quiz";

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

	const [activeTab, setActiveTab] = useState<string>("Edit manually");

	const handleTabChange = useCallback(() => {
		setActiveTab((previousTab) =>
			previousTab === "Edit manually" ? "Retake Quiz" : "Edit manually",
		);
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
			style={{ backgroundColor: BaseColor.BG_WHITE }}
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
							tabs={["Edit manually", "Retake Quiz"]}
						/>
					</View>

					{activeTab === "Edit manually" ? (
						<ScrollView>
							<ScoresEditForm data={scores} onSubmit={handleEditScores} />
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
