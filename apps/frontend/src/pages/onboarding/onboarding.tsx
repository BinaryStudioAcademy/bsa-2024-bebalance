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
import { ONBOARDING_FORM_DEFAULT_VALUES } from "./libs/constants/constants.js";
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
		isLastQuestion,
		question,
		totalQuestionsAmount,
	} = useAppSelector(({ onboarding }) => ({
		currentQuestionIndex: onboarding.currentQuestionIndex,
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
								currentItemIndex={currentQuestionIndex}
								totalItemsAmount={totalQuestionsAmount}
							/>
						</div>
						<h2 className={styles["question"]}>{question.label}</h2>
						<div className={styles["answers"]}>
							<form className={styles["answers"]} onSubmit={handleFormSubmit}>
								{question.answers.map((answer) => (
									<OnboardingAnswer
										control={control}
										key={answer.id}
										name="answer"
										options={[
											{ label: answer.label, value: answer.id.toString() },
										]}
									/>
								))}
								<div className={styles["button-container"]}>
									{!isLastQuestion && (
										<Button
											label="BACK"
											onClick={handlePreviousStep}
											type="button"
											variant="secondary"
										/>
									)}
									<Button
										isPrimary={isValid}
										label={isLastQuestion ? "ANALYZE" : "NEXT"}
										type="submit"
									/>
								</div>
							</form>
						</div>
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
