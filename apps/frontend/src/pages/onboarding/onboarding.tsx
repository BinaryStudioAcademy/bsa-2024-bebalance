import { Button, Loader, ProgressBar } from "~/libs/components/components.js";
import { PREVIOUS_INDEX_OFFSET } from "~/libs/constants/constants.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { notification } from "~/libs/modules/notification/notification.js";
import {
	actions as onboardingActions,
	oneAnswerSelectedValidationSchema,
} from "~/modules/onboarding/onboarding.js";
import { ONBOARDING_FORM_DEFAULT_VALUES } from "~/pages/onboarding/libs/constants/constants.js";

import { OnboardingAnswer } from "./libs/components/onboarding-answer/onboarding-answer.js";
import { OnboardingValidationMessage } from "./libs/enums/emuns.js";
import { type OnboardingFormValues } from "./libs/types/types.js";
import styles from "./styles.module.css";

const Onboarding: React.FC = () => {
	const dispatch = useAppDispatch();

	const {
		currentQuestionIndex,
		isLastQuestion,
		question,
		totalQuestionsAmount,
	} = useAppSelector(({ onboarding }) => ({
		currentQuestionIndex: onboarding.currentQuestionIndex,
		isLastQuestion:
			onboarding.currentQuestionIndex ===
			onboarding.allQuestions.length - PREVIOUS_INDEX_OFFSET,
		question: onboarding.currentQuestion,
		totalQuestionsAmount: onboarding.allQuestions.length,
	}));

	useEffect(() => {
		void dispatch(onboardingActions.getAll());
	}, [dispatch]);

	const { control, handleSubmit, isValid, reset } =
		useAppForm<OnboardingFormValues>({
			defaultValues: ONBOARDING_FORM_DEFAULT_VALUES,
			validationSchema: oneAnswerSelectedValidationSchema,
		});

	const handleSaveAnswers = useCallback((data: OnboardingFormValues) => {
		//TODO: add save to backend
		return data;
	}, []);

	const handleNextStep = useCallback(
		(data: OnboardingFormValues) => {
			if (isLastQuestion) {
				return handleSaveAnswers(data);
			}

			void dispatch(onboardingActions.nextQuestion());
			reset();
		},

		[isLastQuestion, dispatch, reset, handleSaveAnswers],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			if (!isValid) {
				notification.error(OnboardingValidationMessage.ONE_ANSWER_REQUIRED);
			}

			void handleSubmit(handleNextStep)(event_);
		},
		[handleNextStep, handleSubmit, isValid],
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["onboarding"]}>
				{question ? (
					<>
						<div className={styles["progress-bar"]}>
							<ProgressBar
								currentQuestionIndex={currentQuestionIndex}
								totalQuestionsAmount={totalQuestionsAmount}
							/>
						</div>
						<h2 className={styles["question"]}>{question.label}</h2>
						<div className={styles["answers"]}>
							<form className={styles["answers"]}>
								{question.answers.map((answer) => (
									<OnboardingAnswer
										control={control}
										key={answer.id}
										name="answer"
										options={[{ label: answer.label, value: answer.label }]}
									/>
								))}
								<div className={styles["button-container"]}>
									<Button
										label={isLastQuestion ? "ANALYZE" : "NEXT"}
										onClick={handleFormSubmit}
										type="button"
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
