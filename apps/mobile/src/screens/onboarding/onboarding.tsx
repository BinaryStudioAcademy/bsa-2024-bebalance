import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
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
	useNavigation,
	useRef,
	useState,
} from "~/libs/hooks/hooks";
import { actions as onboardingActions } from "~/slices/onboarding/onboarding";

import { pageInterpolatorSlide } from "./libs/animations/animations";
import { Content } from "./libs/components/components";
import { FORM_DEFAULT_VALUE } from "./libs/constants/constants";
import { selectOnboardingState } from "./libs/selector/selector";
import { type OnboardingFormValues } from "./libs/types/types";
import { styles } from "./styles";

type RootStackParamList = {
	[RootScreenName.WELCOME]: undefined;
};

const Onboarding: React.FC = () => {
	const dispatch = useAppDispatch();
	const pagerReference = useRef<InfinitePagerImperativeApi | null>(null);
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const [answerIds, setAnswerIds] = useState<OnboardingAnswerRequestBodyDto>({
		answerIds: [],
	});

	const {
		currentQuestionIndex,
		dataStatus,
		isLastQuestion,
		question,
		totalQuestionsAmount,
	} = useAppSelector(selectOnboardingState);

	useEffect(() => {
		void dispatch(onboardingActions.getAll());
	}, [dispatch]);

	const { control, errors, handleSubmit, reset, isValid } =
		useAppForm<OnboardingFormValues>({
			defaultValues: FORM_DEFAULT_VALUE,
			validationSchema: oneAnswerSelectedValidationSchema,
		});

	const handleSaveAnswers = useCallback(() => {
			//TODO: save to backend
		},
		[],
	);

	useEffect(() => {
		const activeButtonId = answerIds.answerIds[currentQuestionIndex];
		const activeButtonIdString =
			activeButtonId !== undefined ? activeButtonId.toString() : "";
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
				return handleSaveAnswers();
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
	}, [dispatch, reset, currentQuestionIndex, answerIds]);

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
									pageBuffer={1}
									PageComponent={() => (
										<Content
											question={question}
											control={control}
											errors={errors}
										/>
									)}
									pageInterpolator={pageInterpolatorSlide}
									ref={pagerReference}
								/>
							</>
						)}
						{isLastQuestion ? (
							<Button
								label="ANALYZE"
								isDisabled={!isValid}
								onPress={() => navigation.navigate(RootScreenName.WELCOME)}
							/>
						) : (
							<View style={styles.buttonsContainer}>
								<Button label="NEXT" onPress={handleFormSubmit}
												isDisabled={!isValid}/>
								<Button
									isDisabled={currentQuestionIndex === 0}
									appearance={"outlined"}
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
