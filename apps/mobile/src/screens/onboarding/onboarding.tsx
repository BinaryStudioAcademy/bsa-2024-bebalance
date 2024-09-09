import {
	BackgroundWrapper,
	Button,
	InfinitePager,
	LoaderWrapper,
	ProgressBar,
	ScreenWrapper,
	View,
} from "~/libs/components/components";
import { PREVIOUS_INDEX_OFFSET } from "~/libs/constants/constants";
import { DataStatus, RootScreenName } from "~/libs/enums/enums";
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
import { oneAnswerSelectedValidationSchema } from "~/packages/onboarding/onboarding";
import { actions as onboardingActions } from "~/slices/onboarding/onboarding";

import { Content } from "./libs/components/components";
import { ONBOARDING_FORM_DEFAULT_VALUES } from "./libs/constants/constants";
import {
	type OnboardingAnswerRequestBodyDto,
	type OnboardingFormValues,
	type RootStackParameterList,
} from "./libs/types/types";
import { styles } from "./styles";

const ZERO = 0;

const Onboarding: React.FC = () => {
	const dispatch = useAppDispatch();
	const infinitePager = useRef<InfinitePagerImperativeApi | null>(null);

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParameterList>>();

	const {
		answersByQuestionIndex,
		currentQuestion,
		currentQuestionIndex,
		dataStatus,
		questions,
	} = useAppSelector((state) => state.onboarding);

	const currentAnswer = answersByQuestionIndex[currentQuestionIndex] ?? "";
	const totalQuestionsAmount = questions.length - PREVIOUS_INDEX_OFFSET;
	const isLastQuestion = currentQuestionIndex === totalQuestionsAmount;

	useEffect(() => {
		void dispatch(onboardingActions.getAll());
	}, [dispatch]);

	const { control, errors, handleSubmit, isValid, reset } =
		useAppForm<OnboardingFormValues>({
			defaultValues: ONBOARDING_FORM_DEFAULT_VALUES,
			validationSchema: oneAnswerSelectedValidationSchema,
		});

	const handleSaveAnswers = useCallback(
		(payload: OnboardingAnswerRequestBodyDto) => {
			//TODO: save data to backend
			return payload;
		},
		[],
	);

	useEffect(() => {
		reset({ answer: currentAnswer.toString() });
	}, [currentQuestionIndex, currentAnswer, reset]);

	const handleNextClick = useCallback(
		(payload: OnboardingFormValues) => {
			dispatch(
				onboardingActions.setAnswersByQuestionIndex({
					answerId: Number(payload.answer),
					questionIndex: currentQuestionIndex,
				}),
			);

			if (isLastQuestion) {
				handleSaveAnswers({ answerIds: answersByQuestionIndex });

				return;
			}

			if (infinitePager.current) {
				infinitePager.current.incrementPage({ animated: true });
			}

			void dispatch(onboardingActions.nextQuestion());
		},

		[
			isLastQuestion,
			dispatch,
			handleSaveAnswers,
			currentQuestionIndex,
			answersByQuestionIndex,
		],
	);

	const handlePreviousClick = useCallback(() => {
		void dispatch(onboardingActions.previousQuestion());

		if (infinitePager.current) {
			infinitePager.current.decrementPage({ animated: true });
		}
	}, [dispatch]);

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(handleNextClick)();

		if (isLastQuestion) {
			navigation.navigate(RootScreenName.WELCOME);
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
							globalStyles.mt12,
							globalStyles.p24,
							styles.container,
						]}
					>
						{currentQuestion && (
							<>
								<ProgressBar
									currentItemIndex={currentQuestionIndex}
									totalItemsAmount={totalQuestionsAmount}
								/>
								<InfinitePager
									infinitePagerReference={infinitePager}
									renderPageComponent={renderPageComponent}
								/>
								<View style={globalStyles.gap12}>
									<Button
										isDisabled={!isValid}
										label={isLastQuestion ? "ANALYZE" : "NEXT"}
										onPress={handleFormSubmit}
									/>
									{currentQuestionIndex !== ZERO && (
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

export { Onboarding };
