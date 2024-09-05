import { type NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
	BackgroundWrapper,
	Button,
	InfinitePager,
	type InfinitePagerImperativeApi,
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
import { oneAnswerSelectedValidationSchema } from "~/packages/onboarding/onboarding";
import { actions as onboardingActions } from "~/slices/onboarding/onboarding";

import { pageInterpolatorSlide } from "./libs/animations/animations";
import { Content } from "./libs/components/components";
import {
	AnimationConfigValues,
	ONBOARDING_FORM_DEFAULT_VALUES,
} from "./libs/constants/constants";
import {
	type OnboardingAnswerRequestBodyDto,
	type OnboardingFormValues,
} from "./libs/types/types";
import { styles } from "./styles";

type RootStackParameterList = {
	[RootScreenName.WELCOME]: undefined;
};

const ZERO = 0;

const Onboarding: React.FC = () => {
	const dispatch = useAppDispatch();
	const pagerReference = useRef<InfinitePagerImperativeApi | null>(null);

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParameterList>>();

	const {
		allAnswers,
		currentAnswer,
		currentQuestionIndex,
		dataStatus,
		isLastQuestion,
		question,
		totalQuestionsAmount,
	} = useAppSelector(({ onboarding }) => ({
		allAnswers: onboarding.answersByQuestionIndex,
		currentAnswer:
			onboarding.answersByQuestionIndex[onboarding.currentQuestionIndex] || "",
		currentQuestionIndex: onboarding.currentQuestionIndex,
		dataStatus: onboarding.dataStatus,
		isLastQuestion:
			onboarding.currentQuestionIndex ===
			onboarding.questions.length - PREVIOUS_INDEX_OFFSET,
		question: onboarding.currentQuestion,
		totalQuestionsAmount: onboarding.questions.length - PREVIOUS_INDEX_OFFSET,
	}));

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
				handleSaveAnswers({ answerIds: allAnswers });

				return;
			}

			if (pagerReference.current) {
				pagerReference.current.incrementPage({ animated: true });
			}

			void dispatch(onboardingActions.nextQuestion());
		},

		[
			isLastQuestion,
			dispatch,
			handleSaveAnswers,
			currentQuestionIndex,
			allAnswers,
		],
	);

	const handlePreviousClick = useCallback(() => {
		void dispatch(onboardingActions.previousQuestion());

		if (pagerReference.current) {
			pagerReference.current.decrementPage({ animated: true });
		}
	}, [dispatch]);

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(handleNextClick)();
	}, [handleNextClick, handleSubmit]);

	const handleAnalyzePress = useCallback((): void => {
		void handleSubmit(handleNextClick)();
		navigation.navigate(RootScreenName.WELCOME);
	}, [navigation, handleNextClick, handleSubmit]);

	const renderPageComponent = useCallback(() => {
		return <Content control={control} errors={errors} question={question} />;
	}, [control, errors, question]);

	return (
		<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
			<BackgroundWrapper>
				<ScreenWrapper>
					<View
						style={[
							styles.container,
							globalStyles.flex1,
							globalStyles.mb16,
							globalStyles.mh12,
							globalStyles.mt12,
							globalStyles.p24,
						]}
					>
						{question && (
							<>
								<ProgressBar
									currentItemIndex={currentQuestionIndex}
									totalItemsAmount={Math.max(
										totalQuestionsAmount,
										PREVIOUS_INDEX_OFFSET,
									)}
								/>
								<InfinitePager
									animationConfig={{
										damping: AnimationConfigValues.DAMPING,
										mass: AnimationConfigValues.MASS,
										stiffness: AnimationConfigValues.STIFFNESS,
									}}
									gesturesDisabled
									pageBuffer={PREVIOUS_INDEX_OFFSET}
									PageComponent={renderPageComponent}
									pageInterpolator={pageInterpolatorSlide}
									ref={pagerReference}
								/>
							</>
						)}
						{isLastQuestion ? (
							<Button
								isDisabled={!isValid}
								label="ANALYZE"
								onPress={handleAnalyzePress}
							/>
						) : (
							<View style={globalStyles.gap12}>
								<Button
									isDisabled={!isValid}
									label="NEXT"
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
						)}
					</View>
				</ScreenWrapper>
			</BackgroundWrapper>
		</LoaderWrapper>
	);
};

export { Onboarding };
