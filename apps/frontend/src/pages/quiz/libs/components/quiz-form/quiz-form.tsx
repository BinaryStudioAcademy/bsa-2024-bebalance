import RippleEffectBg from "~/assets/img/ripple-effect-bg.svg?react";
import RippleEffectBg2 from "~/assets/img/ripple-effect-bg2.svg?react";
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

import { QUIZ_FORM_DEFAULT_VALUES } from "../../constants/constants.js";
import { type QuizFormValues } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	onNext: () => void;
};

type FormToSave = {
	[key: string]: string;
};

const ONE_STEP_OFFSET = 1;
const ZERO = 0;

const QuizForm: React.FC<Properties> = ({ onNext }: Properties) => {
	const dispatch = useAppDispatch();
	const [isLast, setIsLast] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [categoryDone, setCategoryDone] = useState<number[]>([]);

	const { control, getValues, handleSubmit } = useAppForm<QuizFormValues>({
		defaultValues: QUIZ_FORM_DEFAULT_VALUES,
	});

	const { category, currentCategoryIndex, dataStatus, questions } =
		useAppSelector(({ quiz }) => ({
			category: quiz.currentCategory,
			currentCategoryIndex: quiz.currentCategoryIndex,
			dataStatus: quiz.dataStatus,
			questions: quiz.questions,
		}));

	useEffect(() => {
		void dispatch(quizActions.getAllQuestions());
	}, [dispatch]);

	useEffect(() => {
		setIsLast(currentCategoryIndex === questions.length - ONE_STEP_OFFSET);
	}, [currentCategoryIndex, questions]);

	const handlePreviousStep = useCallback(() => {
		void dispatch(quizActions.previousQuestion());
	}, [dispatch]);

	useEffect(() => {
		if (categoryDone.includes(currentCategoryIndex)) {
			setIsDisabled(false);
		}
	}, [categoryDone, currentCategoryIndex]);

	const handleOnChange = useCallback(() => {
		if (!category) {
			return;
		}

		const questionLabels = category.map(
			(categoryItem) => `question${categoryItem.id.toString()}`,
		);

		const formValues = getValues();

		const hasUndefined = questionLabels.some(
			(question) => formValues[question] === undefined,
		);

		if (!hasUndefined) {
			setCategoryDone([...categoryDone, currentCategoryIndex]);
			setIsDisabled(false);
		}
	}, [category, categoryDone, currentCategoryIndex, getValues]);

	const getAnswerIds = useCallback((formData: FormToSave) => {
		return Object.values(formData).map(Number);
	}, []);

	const handleNextStep = useCallback(
		(data: QuizFormValues) => {
			if (!category) {
				return;
			}

			const questionLabels = category.map(
				(categoryItem) => `question${categoryItem.id.toString()}`,
			);
			const hasUndefinedAnswers = questionLabels.some(
				(question) => data[question] === undefined,
			);

			if (!hasUndefinedAnswers) {
				const questionFormAnswers = Object.fromEntries(
					Object.entries(data).filter(([key]) => key !== "answers"),
				);

				if (isLast) {
					const answerIds = getAnswerIds(questionFormAnswers);

					void dispatch(quizActions.saveAnswers({ answerIds }));

					onNext();
				}

				setCategoryDone([...categoryDone, currentCategoryIndex]);
				setIsDisabled(true);
				void dispatch(quizActions.nextQuestion());
			}
		},
		[
			category,
			categoryDone,
			currentCategoryIndex,
			dispatch,
			getAnswerIds,
			isLast,
			onNext,
		],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleNextStep)(event_);
		},
		[handleNextStep, handleSubmit],
	);

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<div className={styles["quiz-container"]}>
			<form
				className={styles["questions-form"]}
				onChange={handleOnChange}
				onSubmit={handleFormSubmit}
			>
				<div className={styles["progress-bar-container"]}>
					<ProgressBar
						currentStep={currentCategoryIndex}
						numberOfSteps={questions.length}
					/>
				</div>
				<h2 className={styles["quiz-header"]}>Wheel Quiz questions</h2>
				<div className={styles["questions-wrapper"]}>
					{isLoading ? (
						<div className={styles["loader"]}>
							<Loader />
						</div>
					) : (
						category?.map((question) => {
							const answerOptions = question.answers.map(({ id, label }) => ({
								label,
								value: id.toString(),
							}));

							return (
								<QuizQuestion
									control={control}
									key={question.id}
									label={question.label}
									name={`question${question.id.toString()}`}
									options={answerOptions}
								/>
							);
						})
					)}
				</div>
				<div className={styles["form-footer"]}>
					{currentCategoryIndex !== ZERO && (
						<div className={styles["button-container"]}>
							<Button
								label="BACK"
								onClick={handlePreviousStep}
								variant="secondary"
							/>
						</div>
					)}
					<div className={styles["button-container"]}>
						<Button
							isDisabled={isDisabled}
							label="NEXT"
							type="submit"
							variant="primary"
						/>
					</div>
				</div>
			</form>
			<RippleEffectBg className={styles["ripple-effect__background1"]} />
			<RippleEffectBg2 className={styles["ripple-effect__background2"]} />
			<div className={styles["circle-gradient1"]} />
			<div className={styles["circle-gradient2"]} />
		</div>
	);
};

export { QuizForm };
