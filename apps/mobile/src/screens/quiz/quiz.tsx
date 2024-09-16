import {
	BackgroundWrapper,
	Button,
	InfinitePager,
	LoaderWrapper,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { DataStatus, NumericalValue, RootScreenName } from "~/libs/enums/enums";
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
	type QuizFormValues,
	type RootStackParameterList,
} from "./libs/types/types";
import { styles } from "./styles";

const Quiz: React.FC = () => {
	const dispatch = useAppDispatch();
	const infinitePagerReference = useRef<InfinitePagerImperativeApi | null>(
		null,
	);

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
		void dispatch(quizActions.getAllQuestions());
	}, [dispatch]);

	const { control, errors, handleSubmit, isValid, reset } =
		useAppForm<QuizFormValues>({
			defaultValues: QUIZ_FORM_DEFAULT_VALUES,
			validationSchema: categoryAnswerSelectedValidationSchema,
		});

	useEffect(() => {
		reset({ answer: currentAnswer.toString() });
	}, [currentQuestionIndex, currentAnswer, reset]);

	const handleNextClick = useCallback(
		(payload: QuizFormValues) => {
			dispatch(
				quizActions.setAnswersByQuestionIndex({
					answerId: Number(payload.answer),
					questionIndex: currentQuestionIndex,
				}),
			);

			infinitePagerReference.current?.incrementPage({ animated: true });

			void dispatch(quizActions.nextQuestion());
		},

		[dispatch, currentQuestionIndex],
	);

	const handlePreviousClick = useCallback(() => {
		void dispatch(quizActions.previousQuestion());

		infinitePagerReference.current?.decrementPage({ animated: true });
	}, [dispatch]);

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(handleNextClick)();

		if (isLastQuestion) {
			navigation.navigate(RootScreenName.NOTIFICATION_QUESTIONS);
		}
	}, [handleNextClick, handleSubmit, isLastQuestion, navigation]);

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
