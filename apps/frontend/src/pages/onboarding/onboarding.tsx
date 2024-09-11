import { Button, Loader, ProgressBar } from "~/libs/components/components.js";
import { PREVIOUS_INDEX_OFFSET } from "~/libs/constants/constants.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	actions as onboardingActions,
	oneAnswerSelectedValidationSchema,
} from "~/modules/onboarding/onboarding.js";

import { OnboardingAnswer } from "./libs/components/components.js";
import {
	FIRST_QUESTION_INDEX,
	ONBOARDING_FORM_DEFAULT_VALUES,
} from "./libs/constants/constants.js";
import { ButtonLabel } from "./libs/enums/enums.js";
import {
	type OnboardingAnswerRequestBodyDto,
	type OnboardingFormValues,
} from "./libs/types/types.js";
import styles from "./styles.module.css";

const Onboarding: React.FC = () => {
	const dispatch = useAppDispatch();

	const [answerIds, setAnswerIds] = useState<OnboardingAnswerRequestBodyDto>({
		answerIds: [],
	});

	const {
		currentQuestionIndex,
		isFirstQuestion,
		isLastQuestion,
		question,
		totalQuestionsAmount,
	} = useAppSelector(({ onboarding }) => ({
		currentQuestionIndex: onboarding.currentQuestionIndex,
		isFirstQuestion: onboarding.currentQuestionIndex === FIRST_QUESTION_INDEX,
		isLastQuestion:
			onboarding.currentQuestionIndex ===
			onboarding.questions.length - PREVIOUS_INDEX_OFFSET,
		question: onboarding.currentQuestion,
		totalQuestionsAmount: onboarding.questions.length,
	}));

	useEffect(() => {
		void dispatch(onboardingActions.getAll());
	}, [dispatch]);

	const { control, handleSubmit, isValid, reset } =
		useAppForm<OnboardingFormValues>({
			defaultValues: ONBOARDING_FORM_DEFAULT_VALUES,
			validationSchema: oneAnswerSelectedValidationSchema,
		});

	const handleSaveAnswers = useCallback(
		(payload: OnboardingAnswerRequestBodyDto) => {
			return payload; //TODO call api
		},
		[],
	);

	const handleNextStep = useCallback(
		(data: OnboardingFormValues) => {
			setAnswerIds((previousState) => {
				const newAnswerIds = new Set([
					...previousState.answerIds,
					Number(data.answer),
				]);

				return {
					answerIds: [...newAnswerIds],
				};
			});

			if (isLastQuestion) {
				handleSaveAnswers(answerIds);

				return;
			}

			void dispatch(onboardingActions.nextQuestion());
			reset();
		},

		[answerIds, dispatch, handleSaveAnswers, isLastQuestion, reset],
	);

	const handlePreviousStep = useCallback(() => {
		setAnswerIds((previousState) => {
			const newAnswerIds = [...previousState.answerIds];
			newAnswerIds.pop();

			return {
				answerIds: newAnswerIds,
			};
		});
		void dispatch(onboardingActions.previousQuestion());
	}, [dispatch]);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleNextStep)(event_);
		},
		[handleNextStep, handleSubmit],
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["onboarding"]}>
				{question ? (
					<>
						<div className={styles["progress-bar"]}>
							<ProgressBar
								currentStep={currentQuestionIndex}
								numberOfSteps={totalQuestionsAmount}
							/>
						</div>
						<h2 className={styles["question"]}>{question.label}</h2>
						<form className={styles["answers"]} onSubmit={handleFormSubmit}>
							{question.answers.map((answer) => {
								const answerOptions = [
									{ label: answer.label, value: answer.id.toString() },
								];

								return (
									<OnboardingAnswer
										control={control}
										key={answer.id}
										name="answer"
										options={answerOptions}
									/>
								);
							})}
							<div className={styles["button-container"]}>
								{!isFirstQuestion && (
									<div className={styles["button-wrapper"]}>
										<Button
											isPrimary={false}
											label={ButtonLabel.BACK}
											onClick={handlePreviousStep}
											type="button"
										/>
									</div>
								)}
								<div className={styles["button-wrapper"]}>
									<Button
										isDisabled={!isValid}
										label={
											isLastQuestion ? ButtonLabel.ANALYZE : ButtonLabel.NEXT
										}
										type="submit"
									/>
								</div>
							</div>
						</form>
					</>
				) : (
					<div className={styles["loader"]}>
						<Loader />
					</div>
				)}
			</div>
		</div>
	);
};

export { Onboarding };
