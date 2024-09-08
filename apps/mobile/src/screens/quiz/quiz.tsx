import {
	BackgroundWrapper,
	Button,
	type InfinitePagerImperativeApi,
	LoaderWrapper,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { InfinitePager } from "~/libs/components/infinite-pager/infinite-pager";
import { PREVIOUS_INDEX_OFFSET } from "~/libs/constants/constants";
import { DataStatus } from "~/libs/enums/app/data-status.enum";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useRef,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { categoryAnswerSelectedValidationSchema } from "~/packages/quiz/quiz";
import { actions as quizActions } from "~/slices/quiz/quiz";

import { Content, Counter } from "./libs/components/components";
import { QUIZ_FORM_DEFAULT_VALUES } from "./libs/constants/costants";
import { type QuizFormValues } from "./libs/types/types";
import { styles } from "./styles";

const Quiz: React.FC = () => {
	const dispatch = useAppDispatch();
	const infinitePagerReference = useRef<InfinitePagerImperativeApi | null>(
		null,
	);

	const {
		currentQuestionIndex,
		dataStatus,
		isLastQuestion,
		question,
		totalQuestionsAmount,
	} = useAppSelector(({ quiz }) => ({
		currentQuestionIndex: quiz.currentQuestionIndex,
		dataStatus: quiz.dataStatus,
		isLastQuestion:
			quiz.currentQuestionIndex ===
			quiz.questions.length - PREVIOUS_INDEX_OFFSET,
		question: quiz.currentQuestion,
		totalQuestionsAmount: quiz.questions.length - PREVIOUS_INDEX_OFFSET,
	}));

	console.log("ONE QUESTION", question);

	// console.log(`ONE QUESTION ANSWER`, question["answers"]);

	useEffect(() => {
		void dispatch(quizActions.getAllQuestions());
	}, [dispatch]);

	const { control, errors, handleSubmit, isValid } = useAppForm<QuizFormValues>(
		{
			defaultValues: QUIZ_FORM_DEFAULT_VALUES,
			validationSchema: categoryAnswerSelectedValidationSchema,
		},
	);

	const renderPageComponent = useCallback(() => {
		return <Content control={control} errors={errors} question={question} />;
	}, [control, errors, question]);

	return (
		<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
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
						<Text
							preset="subheading"
							style={{ textAlign: "center" }}
							weight="bold"
						>
							Wheel Quiz questions
						</Text>
						<Counter
							currentStep={currentQuestionIndex}
							totalSteps={totalQuestionsAmount}
						/>
						<InfinitePager
							infinitePagerReference={infinitePagerReference}
							renderPageComponent={renderPageComponent}
						/>
						<View style={globalStyles.gap12}>
							<Button
								isDisabled={!isValid}
								label={isLastQuestion ? "ANALYZE" : "NEXT"}
								onPress={() => {}}
							/>
							{currentQuestionIndex !== 0 && (
								<Button appearance="outlined" label="BACK" onPress={() => {}} />
							)}
						</View>
					</View>
				</ScreenWrapper>
			</BackgroundWrapper>
		</LoaderWrapper>
	);
};

export { Quiz };
