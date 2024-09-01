import {
	Button,
	Loader,
	ProgressBar,
	QuizQuestion,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	actions as quizActions,
	type QuizQuestionDto,
} from "~/modules/quiz/quiz.js";

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
	const [categories, setCategories] = useState<QuizQuestionDto[][]>();
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
		void dispatch(quizActions.getQuestions());
	}, [dispatch]);
	useEffect(() => {
		if (dataStatus === DataStatus.FULFILLED) {
			const groupedByCategory: Record<number, QuizQuestionDto[]> = {};

			for (const question of questions) {
				const { categoryId } = question;

				if (!groupedByCategory[categoryId]) {
					groupedByCategory[categoryId] = [];
				}

				groupedByCategory[categoryId].push(question);
			}

			const result = Object.values(groupedByCategory);
			setCategories(result);
		}
	}, [dataStatus, questions]);
	useEffect(() => {
		if (categories) {
			setIsLast(currentStep === categories.length - ONE_STEP_OFFSET);
		}
	}, [currentStep, categories]);

	const handleBackStep = useCallback(() => {
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
				{categories && (
					<ProgressBar currentStep={currentStep} steps={categories.length} />
				)}
				<h2 className={styles["quiz-header"]}>Wheel Quiz questions</h2>
				<div className={styles["questions-wrapper"]}>
					{!isLoading && categories ? (
						categories[currentStep]?.map(
							(question) =>
								question.answers && (
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
								),
						)
					) : (
						<div className={styles["loader"]}>
							<Loader />
						</div>
					)}
				</div>
				<div className={styles["form-footer"]}>
					<div className={styles["btn-secondary"]}>
						<Button
							isPrimary
							label="BACK"
							onClick={handleBackStep}
							variant="dark"
						/>
					</div>
					{isLast ? (
						<div className={styles["btn"]}>
							<Button label="CONTINUE" onClick={onNext} variant="secondary" />
						</div>
					) : (
						<div className={styles["btn"]}>
							<Button
								label="NEXT"
								onClick={handleNextStep}
								variant="secondary"
							/>
						</div>
					)}
				</div>
			</form>
		</div>
	);
};

export { QuizForm };
