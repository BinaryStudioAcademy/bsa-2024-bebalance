import { Button, Loader, ProgressBar } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as onboardingActions } from "~/modules/onboarding/onboarding.js";

import { OnboardingAnswer } from "./libs/components/components.js";
import { ONBOARDING_FORM_DEFAULT_VALUES } from "./libs/constants/constants.js";
import { ButtonLabel } from "./libs/enums/enums.js";
import { type OnboardingFormValues } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	onNext: () => void;
};

type FormToSave = {
	[key: string]: string[];
};

const ZERO = 0;
const ONE = 1;

const OnboardingForm: React.FC<Properties> = ({ onNext }: Properties) => {
	const dispatch = useAppDispatch();
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [questionDone, setQuestionDone] = useState<number[]>([]);
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
		if (
			dataStatus === DataStatus.FULFILLED &&
			currentQuestionIndex === questions.length - ONE
		) {
			setIsLastQuestion(true);
		}
	}, [currentQuestionIndex, dataStatus, questions]);

	const { control, handleSubmit } = useAppForm<OnboardingFormValues>({
		defaultValues: ONBOARDING_FORM_DEFAULT_VALUES,
	});

	useEffect(() => {
		if (questionDone.includes(currentQuestionIndex)) {
			setIsDisabled(false);
		}
	}, [currentQuestionIndex, questionDone]);

	const handleOnChange = useCallback(() => {
		if (!question) {
			return;
		}

		const questionLabel = `question${question.id.toString()}`;
		const isUndefined = control._formValues[questionLabel] === undefined;

		if (!isUndefined) {
			setIsDisabled(false);
		}
	}, [control._formValues, question]);

	const getAnswerIds = useCallback((formData: FormToSave) => {
		return Object.values(formData).map(Number);
	}, []);

	const handleNextStep = useCallback(
		(data: OnboardingFormValues) => {
			if (!question) {
				return;
			}

			const hasAnswer = data[`question${question.id.toString()}`] !== undefined;

			if (hasAnswer) {
				const newObject = Object.fromEntries(
					Object.entries(data).filter(([key]) => key !== "answers"),
				);

				if (isLastQuestion) {
					const answerIds = getAnswerIds(newObject);
					void dispatch(onboardingActions.saveAnswers({ answerIds }));
					onNext();
				}

				setQuestionDone([...questionDone, currentQuestionIndex]);
				setIsDisabled(true);
				void dispatch(onboardingActions.nextQuestion());
			}
		},

		[
			currentQuestionIndex,
			dispatch,
			getAnswerIds,
			isLastQuestion,
			onNext,
			question,
			questionDone,
		],
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
								{currentQuestionIndex !== ZERO && (
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
