import { Button, Loader, ProgressBar } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as onboardingActions } from "~/modules/onboarding/onboarding.js";

import {
	PREVIOUS_INDEX_OFFSET,
	ZERO_INDEX,
} from "../../constants/constants.js";
import { getOnboardingDefaultValues } from "../../helpers/helpers.js";
import { OnboardingAnswer } from "./libs/components/components.js";
import { ButtonLabel } from "./libs/enums/enums.js";
import { type OnboardingFormValues } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	onNext: () => void;
};

const OnboardingForm: React.FC<Properties> = ({ onNext }: Properties) => {
	const dispatch = useAppDispatch();
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
	const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);

	const { currentQuestionIndex, dataStatus, question, questions } =
		useAppSelector(({ onboarding }) => ({
			currentQuestionIndex: onboarding.currentQuestionIndex,
			dataStatus: onboarding.dataStatus,
			question: onboarding.currentQuestion,
			questions: onboarding.questions,
		}));

	useEffect(() => {
		void dispatch(onboardingActions.getAll());
	}, [dispatch]);

	useEffect(() => {
		const isLastQuestion = Boolean(
			dataStatus === DataStatus.FULFILLED &&
				currentQuestionIndex === questions.length - PREVIOUS_INDEX_OFFSET &&
				completedQuestions.includes(currentQuestionIndex),
		);
		setIsLastQuestion(isLastQuestion);
	}, [completedQuestions, currentQuestionIndex, dataStatus, questions]);

	const defaultValues = getOnboardingDefaultValues(questions);

	const { control, handleSubmit } = useAppForm<OnboardingFormValues>({
		defaultValues,
	});

	useEffect(() => {
		if (completedQuestions.includes(currentQuestionIndex)) {
			setIsDisabled(false);
		}
	}, [completedQuestions, currentQuestionIndex]);

	const handleOnChange = useCallback(() => {
		setCompletedQuestions([...completedQuestions, currentQuestionIndex]);
		setIsDisabled(false);
	}, [completedQuestions, currentQuestionIndex]);

	const getAnswerIds = useCallback((formData: OnboardingFormValues) => {
		return Object.values(formData).map(Number);
	}, []);

	const handleNextStep = useCallback(
		(data: OnboardingFormValues) => {
			if (isLastQuestion) {
				const answerIds = getAnswerIds(data);
				void dispatch(onboardingActions.saveAnswers({ answerIds }));
				void dispatch(onboardingActions.resetState());
				onNext();
			}

			setIsDisabled(true);
			void dispatch(onboardingActions.nextQuestion());
		},

		[dispatch, getAnswerIds, isLastQuestion, onNext],
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
								currentStep={currentQuestionIndex}
								numberOfSteps={questions.length}
							/>
						</div>
						<h2 className={styles["question"]}>{question.label}</h2>
						<form
							className={styles["answers"]}
							onChange={handleOnChange}
							onSubmit={handleFormSubmit}
						>
							{question.answers.map((answer) => {
								const answerOptions = [
									{ label: answer.label, value: answer.id.toString() },
								];

								return (
									<OnboardingAnswer
										control={control}
										key={answer.id}
										name={`question${question.id.toString()}`}
										options={answerOptions}
									/>
								);
							})}
							<div className={styles["button-container"]}>
								{currentQuestionIndex !== ZERO_INDEX && (
									<div className={styles["button-wrapper"]}>
										<Button
											label={ButtonLabel.BACK}
											onClick={handlePreviousStep}
											type="button"
											variant="secondary"
										/>
									</div>
								)}
								<div className={styles["button-wrapper"]}>
									<Button
										isDisabled={isDisabled}
										label={
											isLastQuestion ? ButtonLabel.ANALYZE : ButtonLabel.NEXT
										}
										type="submit"
										variant="primary"
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

export { OnboardingForm };
