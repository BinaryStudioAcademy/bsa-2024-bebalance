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
import { actions as onboardingActions } from "~/modules/onboarding/onboarding.js";

import { OnboardingAnswer } from "./libs/components/onboarding-answer/onboarding-answer.js";
import { ONBOARDING_FORM_DEFAULT_VALUES } from "./libs/constatns/constants.js";
import { type OnboardingFormValues } from "./libs/types/types.js";
import styles from "./styles.module.css";

const Onboarding: React.FC = () => {
	const dispatch = useAppDispatch();

	const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false);

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

	const { control } = useAppForm<OnboardingFormValues>({
		defaultValues: ONBOARDING_FORM_DEFAULT_VALUES,
	});

	const handleNextStep = useCallback(() => {
		if (isAnswerSelected) {
			setIsAnswerSelected(false);
			void dispatch(onboardingActions.nextQuestion());
		}
	}, [isAnswerSelected, dispatch]);

	const handleFinish = useCallback(() => {
		if (isAnswerSelected) {
			//TODO: add finish logic
		}
	}, [isAnswerSelected]);

	const handleFormChange = useCallback(() => {
		setIsAnswerSelected(true);
	}, []);

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
							<form className={styles["answers"]} onChange={handleFormChange}>
								{question.answers.map((answer) => (
									<OnboardingAnswer
										control={control}
										key={answer.id}
										name="answer"
										options={[{ label: answer.label, value: answer.label }]}
									/>
								))}
							</form>
						</div>
						<div className={styles["button-container"]}>
							{isLastQuestion ? (
								<Button
									isPrimary={isAnswerSelected}
									label="ANALYZE"
									onClick={handleFinish}
									type="button"
								/>
							) : (
								<Button
									isPrimary={isAnswerSelected}
									label="NEXT"
									onClick={handleNextStep}
									type="button"
								/>
							)}
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
