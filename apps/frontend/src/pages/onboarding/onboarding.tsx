import {
	Button,
	Loader,
	ProgressBar,
	type Step,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import { advanceStep, createSteps } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type OnboardingQuestionDto } from "~/libs/types/types.js";
import { actions as onboardingActions } from "~/modules/onboarding/onboarding.js";

import { OnboardingAnswer } from "./libs/components/onboarding-answer/onboarding-answer.js";
import styles from "./styles.module.css";

const ONE_STEP_OFFSET = 1;
const FIRST_STEP_INDEX = 0;

type FormValues = {
	answer: string;
};

const Onboarding: React.FC = () => {
	const dispatch = useAppDispatch();
	const [steps, setSteps] = useState<Step[]>([]);
	const [currentStep, setCurrentStep] = useState<number>(FIRST_STEP_INDEX);
	const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false);
	let surveyData: OnboardingQuestionDto | undefined;

	const { dataStatus, onboarding } = useAppSelector(({ onboarding }) => ({
		dataStatus: onboarding.dataStatus,
		onboarding: onboarding.onboarding,
	}));

	useEffect(() => {
		void dispatch(onboardingActions.getAll());
	}, [dispatch]);

	useEffect(() => {
		if (dataStatus === "fulfilled") {
			const initialSteps = createSteps(onboarding.length);
			setSteps(initialSteps);
		}
	}, [onboarding, dataStatus]);

	const { control } = useAppForm<FormValues>({
		defaultValues: {
			answer: "",
		},
	});

	const handleNextStep = useCallback(() => {
		if (isAnswerSelected) {
			setSteps(advanceStep(steps));
			setCurrentStep(currentStep + ONE_STEP_OFFSET);
			setIsAnswerSelected(false);
		}
	}, [steps, currentStep, isAnswerSelected]);

	const handleFinish = useCallback(() => {
		if (isAnswerSelected) {
			alert("All steps completed!");
		}
	}, [isAnswerSelected]);

	const handleFormChange = useCallback(() => {
		setIsAnswerSelected(true);
	}, []);

	const isLastStep = currentStep === steps.length - ONE_STEP_OFFSET;
	const isLoading = dataStatus === DataStatus.PENDING;

	// if (onboarding) {
	surveyData = onboarding[currentStep];
	// }

	return (
		<div className={styles["container"]}>
			<div className={styles["onboarding"]}>
				{!isLoading && surveyData ? (
					<>
						<div className={styles["progress-bar"]}>
							<ProgressBar steps={steps} />
						</div>
						<h2 className={styles["question"]}>{surveyData.label}</h2>
						<div className={styles["answers"]}>
							<form className={styles["answers"]} onChange={handleFormChange}>
								{surveyData.answers.map((answer) => (
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
							{isLastStep ? (
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
