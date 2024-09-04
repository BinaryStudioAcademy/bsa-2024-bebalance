import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import InfinitePager, {
	type InfinitePagerImperativeApi,
} from "react-native-infinite-pager";
import {
	type OnboardingAnswerRequestBodyDto,
	oneAnswerSelectedValidationSchema,
} from "shared";

import {
	BackgroundWrapper,
	Button,
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
	useMemo,
	useNavigation,
	useRef,
	useState,
} from "~/libs/hooks/hooks";
import { actions as onboardingActions } from "~/slices/onboarding/onboarding";

import { pageInterpolatorSlide } from "./libs/animations/animations";
import { Content } from "./libs/components/components";
import {
	ONBOARDING_FORM_DEFAULT_VALUES,
	ONE,
	ZERO,
} from "./libs/constants/constants";
import { type OnboardingFormValues } from "./libs/types/types";
import { styles } from "./styles";

type RootStackParameterList = {
	[RootScreenName.WELCOME]: undefined;
};

const Onboarding: React.FC = () => {
	const dispatch = useAppDispatch();
	const pagerReference = useRef<InfinitePagerImperativeApi | null>(null);

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParameterList>>();

	const [answerIds, setAnswerIds] = useState<OnboardingAnswerRequestBodyDto>({
		answerIds: [],
	});

	const currentQuestionIndex = useAppSelector(
		({ onboarding }) => onboarding.currentQuestionIndex,
	);
	const questionsLength = useAppSelector(
		({ onboarding }) => onboarding.questions.length,
	);
	const question = useAppSelector(
		({ onboarding }) => onboarding.currentQuestion,
	);
	const dataStatus = useAppSelector(({ onboarding }) => onboarding.dataStatus);

	const isLastQuestion = useMemo(() => {
		return currentQuestionIndex === questionsLength - PREVIOUS_INDEX_OFFSET;
	}, [currentQuestionIndex, questionsLength]);

	const totalQuestionsAmount = useMemo(
		() => questionsLength,
		[questionsLength],
	);

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
		const activeButtonIdString =
			answerIds.answerIds[currentQuestionIndex]?.toString() || "";
		reset({ answer: activeButtonIdString });
	}, [currentQuestionIndex, answerIds]);

	const handleNextClick = useCallback(
		(payload: OnboardingFormValues) => {
			setAnswerIds((previousState) => {
				const newAnswerIds = [...previousState.answerIds];

				if (newAnswerIds[currentQuestionIndex]) {
					newAnswerIds[currentQuestionIndex] = Number(payload.answer);
				} else {
					newAnswerIds.push(Number(payload.answer));
				}

				return {
					answerIds: [...newAnswerIds],
				};
			});

			if (isLastQuestion) {
				handleSaveAnswers(answerIds);

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
			reset,
			handleSaveAnswers,
			answerIds,
			currentQuestionIndex,
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

	return (
		<LoaderWrapper isLoading={dataStatus === DataStatus.PENDING}>
			<BackgroundWrapper>
				<ScreenWrapper>
					<View style={styles.container}>
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
									animationConfig={{ damping: 300, mass: 0.5, stiffness: 30 }}
									gesturesDisabled={true}
									pageBuffer={ONE}
									PageComponent={() => (
										<Content
											control={control}
											errors={errors}
											question={question}
										/>
									)}
									pageInterpolator={pageInterpolatorSlide}
									ref={pagerReference}
								/>
							</>
						)}
						{isLastQuestion ? (
							<Button
								isDisabled={!isValid}
								label="ANALYZE"
								onPress={() => {
									navigation.navigate(RootScreenName.WELCOME);
								}}
							/>
						) : (
							<View style={styles.buttonsContainer}>
								<Button
									isDisabled={!isValid}
									label="NEXT"
									onPress={handleFormSubmit}
								/>
								<Button
									appearance={"outlined"}
									isDisabled={currentQuestionIndex === ZERO}
									label="BACK"
									onPress={handlePreviousClick}
								/>
							</View>
						)}
					</View>
				</ScreenWrapper>
			</BackgroundWrapper>
		</LoaderWrapper>
	);
};

export { Onboarding };
