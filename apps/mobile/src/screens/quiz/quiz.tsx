import { View } from "react-native";

import { BackgroundWrapper, ScreenWrapper } from "~/libs/components/components";
import { DataStatus } from "~/libs/enums/app/data-status.enum";
import { useAppDispatch, useAppSelector, useEffect } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { actions as quizActions } from "~/slices/quiz/quiz";

import { Counter } from "./libs/components/components";
import { styles } from "./styles";

const Quiz: React.FC = () => {
	const dispatch = useAppDispatch();

	const { category, currentCategoryIndex, dataStatus, questions } =
		useAppSelector(({ quiz }) => ({
			category: quiz.currentCategory,
			currentCategoryIndex: quiz.currentCategoryIndex,
			dataStatus: quiz.dataStatus,
			questions: quiz.questions,
		}));

	useEffect(() => {
		void dispatch(quizActions.getAllQuestions());
		console.log(`quizActions.getAllQuestions()`, quizActions.getAllQuestions());
	}, [dispatch]);

	console.log(`category`, category);
	console.log(`currentCategoryIndex`, currentCategoryIndex);
	console.log(`dataStatus`, dataStatus);
	console.log(`questions`, questions);

	return (
		<BackgroundWrapper>
			<ScreenWrapper>
				<View
					style={[
						globalStyles.flex1,
						globalStyles.justifyContentCenter,
						globalStyles.mb16,
						globalStyles.mh12,
						globalStyles.mt32,
						globalStyles.p12,
						styles.container,
					]}
				>
					<Counter currentStep={1} totalSteps={24} />
				</View>
			</ScreenWrapper>
		</BackgroundWrapper>
	);
};

export { Quiz };
