import {
	BackgroundWrapper,
	Button,
	InfinitePager,
	LoaderWrapper,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import {
	DataStatus,
	NumericalValue,
	QuestionsStackName,
} from "~/libs/enums/enums";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useNavigation,
	useRef,
} from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type InfinitePagerImperativeApi,
	type NativeStackNavigationProp,
} from "~/libs/types/types";
import { categoryAnswerSelectedValidationSchema } from "~/packages/quiz/quiz";
import { actions as quizActions } from "~/slices/quiz/quiz";

import { Content, Counter } from "./libs/components/components";
import { QUIZ_FORM_DEFAULT_VALUES } from "./libs/constants/costants";
import {
	type QuizAnswersRequestDto,
	type QuizFormValues,
	type QuizQuestionDto,
	type RootStackParameterList,
} from "./libs/types/types";
import { styles } from "./styles";

function extractCategoryIdsFromQuestions(
	questions: QuizQuestionDto[],
): number[] {
	const categoryIds = new Set<number>();

	for (const questionsInsideCategory of questions) {
		categoryIds.add(questionsInsideCategory.categoryId);
	}

	return [...categoryIds];
}

const Quiz: React.FC = () => {
	const dispatch = useAppDispatch();
	const infinitePagerReference = useRef<InfinitePagerImperativeApi | null>(
		null,
	);

	const { isRetakingQuiz } = useAppSelector(({ quiz }) => quiz);

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParameterList>>();

	const {
		answersByQuestionIndex,
		currentQuestion,
		currentQuestionIndex,
		dataStatus,
		questions,
	} = useAppSelector((state) => state.quiz);

	const currentAnswer = answersByQuestionIndex[currentQuestionIndex] ?? "";
	const totalQuestionsAmount = questions.length;
	const isLastQuestion =
		currentQuestionIndex + NumericalValue.ONE === totalQuestionsAmount;

	useEffect(() => {
		if (!isRetakingQuiz) {
			void dispatch(quizActions.getAllQuestions());
		}
	}, [dispatch, isRetakingQuiz]);

	const { control, errors, handleSubmit, isValid, reset } =
		useAppForm<QuizFormValues>({
			defaultValues: QUIZ_FORM_DEFAULT_VALUES,
			validationSchema: categoryAnswerSelectedValidationSchema,
		});

	useEffect(() => {
		reset({ answer: currentAnswer.toString() });
	}, [currentAnswer, reset]);

	const handleSaveAnswers = useCallback(
		(payload: QuizAnswersRequestDto) => {
			void dispatch(quizActions.saveAnswers(payload));
		},
		[dispatch],
	);

	const handleNextClick = useCallback(
		(payload: QuizFormValues) => {
			const answerId = Number(payload.answer);

			dispatch(
				quizActions.setAnswersByQuestionIndex({
					answerId,
					questionIndex: currentQuestionIndex,
				}),
			);

			if (isLastQuestion) {
				if (isRetakingQuiz) {
					const categoryIds = extractCategoryIdsFromQuestions(questions);
					const answerIds = [...answersByQuestionIndex, answerId];
					handleSaveAnswers({
						answerIds,
						categoryIds,
					});
				} else {
					handleSaveAnswers({
						answerIds: [...answersByQuestionIndex, answerId],
					});
				}
			}

			infinitePagerReference.current?.incrementPage({ animated: true });

			void dispatch(quizActions.nextQuestion());
		},

		[
			dispatch,
			currentQuestionIndex,
			isLastQuestion,
			isRetakingQuiz,
			answersByQuestionIndex,
			handleSaveAnswers,
			questions,
		],
	);

	const handlePreviousClick = useCallback(() => {
		void dispatch(quizActions.previousQuestion());

		infinitePagerReference.current?.decrementPage({ animated: true });
	}, [dispatch]);

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(handleNextClick)();

		if (isLastQuestion) {
			if (isRetakingQuiz) {
				navigation.navigate(QuestionsStackName.WHEEL_LOADING);
			} else {
				navigation.navigate(QuestionsStackName.NOTIFICATION_QUESTIONS);
			}
		}
	}, [
		handleNextClick,
		handleSubmit,
		isLastQuestion,
		navigation,
		isRetakingQuiz,
	]);

	const handleRenderPageComponent = useCallback(() => {
		return (
			<Content control={control} errors={errors} question={currentQuestion} />
		);
	}, [control, errors, currentQuestion]);

	return (
		<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
			<BackgroundWrapper>
				<ScreenWrapper>
					<View
						style={[
							globalStyles.flex1,
							globalStyles.mb16,
							globalStyles.mh12,
							globalStyles.mt32,
							globalStyles.ph16,
							globalStyles.pb16,
							styles.container,
						]}
					>
						{currentQuestion && (
							<>
								<Text
									size="xl"
									style={[globalStyles.mb24, styles.title]}
									weight="bold"
								>
									Wheel Quiz questions
								</Text>
								<Counter
									currentStep={currentQuestionIndex + NumericalValue.ONE}
									totalSteps={totalQuestionsAmount}
								/>
								<View
									style={[
										globalStyles.flex1,
										globalStyles.justifyContentSpaceBetween,
									]}
								>
									<InfinitePager
										infinitePagerReference={infinitePagerReference}
										onPageRender={handleRenderPageComponent}
									/>
									<View style={globalStyles.gap16}>
										<Button
											isDisabled={!isValid}
											label={isLastQuestion ? "CONTINUE" : "NEXT"}
											onPress={handleFormSubmit}
										/>
										{currentQuestionIndex !== NumericalValue.ZERO && (
											<Button
												appearance="outlined"
												label="BACK"
												onPress={handlePreviousClick}
											/>
										)}
									</View>
								</View>
							</>
						)}
					</View>
				</ScreenWrapper>
			</BackgroundWrapper>
		</LoaderWrapper>
	);
};

export { Quiz };
