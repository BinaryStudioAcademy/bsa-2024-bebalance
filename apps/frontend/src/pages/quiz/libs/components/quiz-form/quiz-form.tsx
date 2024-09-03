import {
	Button,
	Loader,
	ProgressBar,
	QuizQuestion,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
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
const INITIAL_STEP = 0;

const QuizForm: React.FC<Properties> = ({ onNext }: Properties) => {
	const dispatch = useAppDispatch();
	const [isLast, setIsLast] = useState<boolean>(false);
	const [currentStep, setCurrentStep] = useState<number>(INITIAL_STEP);
	const { control } = useAppForm<FormValues>({
		defaultValues: { value: "" },
	});

	const { dataStatus, questions } = useAppSelector(({ quiz }) => ({
		dataStatus: quiz.dataStatus,
		questions: quiz.questions,
	}));

	useEffect(() => {
		void dispatch(quizActions.getAllQuestions());
	}, [dispatch]);

	useEffect(() => {
		setIsLast(currentStep === questions.length - ONE_STEP_OFFSET);
	}, [currentStep, questions]);

	const handlePreviousStep = useCallback(() => {
		if (currentStep !== INITIAL_STEP) {
			setCurrentStep(currentStep - ONE_STEP_OFFSET);
		}
	}, [currentStep]);
	const handleNextStep = useCallback(() => {
		setCurrentStep(currentStep + ONE_STEP_OFFSET);
	}, [currentStep]);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<div className={styles["quiz-container"]}>
			<form className={styles["questions-form"]}>
				<ProgressBar
					currentStep={currentStep}
					numberOfSteps={questions.length}
				/>
				<h2 className={styles["quiz-header"]}>Wheel Quiz questions</h2>
				<div className={styles["questions-wrapper"]}>
					{isLoading ? (
						<div className={styles["loader"]}>
							<Loader />
						</div>
					) : (
						questions[currentStep]?.map((question) => {
							const answerOptions = question.answers.map(
								({ label, value }) => ({
									label,
									value: value.toString(),
								}),
							);

							return (
								<QuizQuestion
									control={control}
									key={question.id}
									label={`${question.id.toString()}. ${question.label}`}
									name={question.label}
									options={answerOptions}
								/>
							);
						})
					)}
				</div>
				<div className={styles["form-footer"]}>
					<div className={styles["btn-secondary"]}>
						<Button
							isPrimary={false}
							label="BACK"
							onClick={handlePreviousStep}
						/>
					</div>
					{isLast ? (
						<Button label="CONTINUE" onClick={onNext} />
					) : (
						<Button label="NEXT" onClick={handleNextStep} />
					)}
				</div>
			</form>
		</div>
	);
};

export { QuizForm };
