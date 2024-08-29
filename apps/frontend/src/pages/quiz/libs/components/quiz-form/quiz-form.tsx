import {
	Button,
	Loader,
	ProgressBar,
	QuizQuestion,
	type Step,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import {
	advanceStep,
	createSteps,
	reduceStep,
} from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import styles from "./styles.module.css";

type FormValues = {
	value: string;
};

type Properties = {
	onNext: () => void;
};

const ONE_STEP_OFFSET = 1;
const ALL_STEPS = 6;

const QuizForm: React.FC<Properties> = () => {
	const dispatch = useAppDispatch();
	const [steps, setSteps] = useState<Step[]>([]);
	const [currentStep, setCurrentStep] = useState<number>(ONE_STEP_OFFSET);
	const { control } = useAppForm<FormValues>({
		defaultValues: { value: "" },
	});

	const { dataStatus, questions } = useAppSelector(({ quiz }) => ({
		dataStatus: quiz.dataStatus,
		questions: quiz.questions,
	}));

	useEffect(() => {
		void dispatch(quizActions.getQuestions());
	}, [dispatch]);
	useEffect(() => {
		if (dataStatus === "fulfilled") {
			const initialSteps = createSteps(ALL_STEPS);
			setSteps(initialSteps);
		}
	}, [dataStatus]);

	const handleBackStep = useCallback(() => {
		setSteps(reduceStep(steps));
		setCurrentStep(currentStep - ONE_STEP_OFFSET);
	}, [currentStep, steps]);
	const handleNextStep = useCallback(() => {
		setSteps(advanceStep(steps));
		setCurrentStep(currentStep + ONE_STEP_OFFSET);
	}, [currentStep, steps]);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<div className={styles["quiz-container"]}>
			<form className={styles["questions-form"]}>
				<ProgressBar steps={steps} />
				<h2 className={styles["quiz-header"]}>Wheel Quiz questions</h2>
				<div className={styles["questions-wrapper"]}>
					{!isLoading && questions ? (
						questions.map((question) => (
							<QuizQuestion
								control={control}
								key={question.id}
								label={`${question.id.toString()}. ${question.label}`}
								name={question.label}
								options={question.answers.map(({ label, value }) => ({
									label,
									value: value.toString(),
								}))}
							/>
						))
					) : (
						<div className={styles["loader"]}>
							<Loader />
						</div>
					)}
				</div>
				<div className={styles["form-footer"]}>
					<div className={styles["btn-secondary"]}>
						<Button label="BACK" onClick={handleBackStep} variant="secondary" />
					</div>
					<div className={styles["btn"]}>
						<Button label="NEXT" onClick={handleNextStep} variant="secondary" />
					</div>
				</div>
			</form>
		</div>
	);
};

export { QuizForm };
