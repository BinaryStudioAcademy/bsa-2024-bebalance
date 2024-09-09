import {
	BackgroundWrapper,
	Button,
	InfinitePager,
	LoaderWrapper,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { PREVIOUS_INDEX_OFFSET } from "~/libs/constants/constants";
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
	const totalQuestionsAmount = questions.length - PREVIOUS_INDEX_OFFSET;
	const isLastQuestion = currentQuestionIndex === totalQuestionsAmount;

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
			navigation.navigate(RootScreenName.WHEEL_LOADING);
		}
	}, [handleNextClick, handleSubmit, isLastQuestion, navigation]);

	const renderPageComponent = useCallback(() => {
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
							globalStyles.ph12,
							globalStyles.pt48,
							styles.container,
						]}
					>
						{currentQuestion && (
							<>
								<Text
									preset="subheading"
									style={[globalStyles.mb24, styles.title]}
									weight="bold"
								>
									Wheel Quiz questions
								</Text>
								<Counter
									currentStep={currentQuestionIndex + NumericalValue.ONE}
									totalSteps={totalQuestionsAmount}
								/>
								<InfinitePager
									infinitePagerReference={infinitePagerReference}
									onPageRender={renderPageComponent}
								/>
								<View style={globalStyles.gap12}>
									<Button
										isDisabled={!isValid}
										label={isLastQuestion ? "ANALYZE" : "NEXT"}
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
							</>
						)}
					</View>
				</ScreenWrapper>
			</BackgroundWrapper>
		</LoaderWrapper>
	);
};

export { Quiz };
