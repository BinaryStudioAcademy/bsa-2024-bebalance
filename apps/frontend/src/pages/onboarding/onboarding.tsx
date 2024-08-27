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
import { type SurveyResponseDto } from "~/libs/types/types.js";
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
	const [currentStep, setCurrentStep] = useState(FIRST_STEP_INDEX);
	const [isAnswerSelected, setIsAnswerSelected] = useState(false);
	let surveyData: SurveyResponseDto | undefined;

	const { dataStatus, onboardingSurvey } = useAppSelector(({ onboarding }) => ({
		dataStatus: onboarding.dataStatus,
		onboardingSurvey: onboarding.onboardingSurvey,
	}));

	useEffect(() => {
		void dispatch(onboardingActions.getOnboardingSurvey());
	}, [dispatch]);

	useEffect(() => {
		if (dataStatus === "fulfilled" && onboardingSurvey) {
			const initialSteps = createSteps(onboardingSurvey.length);
			setSteps(initialSteps);
		}
	}, [onboardingSurvey, dataStatus]);

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
		alert("All steps completed!");
	}, []);

	const handleFormChange = useCallback(() => {
		setIsAnswerSelected(true);
	}, []);

	const isLastStep = currentStep === steps.length - ONE_STEP_OFFSET;
	const isLoading = dataStatus === DataStatus.PENDING;

	if (onboardingSurvey) {
		surveyData = onboardingSurvey[currentStep];
	}

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
									variant="dark"
								/>
							) : (
								<Button
									isPrimary={isAnswerSelected}
									label="NEXT"
									onClick={handleNextStep}
									type="button"
									variant="dark"
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
