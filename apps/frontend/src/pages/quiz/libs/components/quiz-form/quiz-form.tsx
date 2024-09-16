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

import {
	PREVIOUS_INDEX_OFFSET,
	ZERO_INDEX,
} from "../../constants/constants.js";
import { getQuizDefaultValues } from "../../helpers/helpers.js";
import { type QuizFormValues } from "../../types/types.js";
import { extractCategoryIdsFromQuestions } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	onNext: () => void;
};

const QuizForm: React.FC<Properties> = ({ onNext }: Properties) => {
	const dispatch = useAppDispatch();
	const [isLast, setIsLast] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [categoryDone, setCategoryDone] = useState<number[]>([]);

	const {
		categoryQuestions,
		currentCategoryIndex,
		dataStatus,
		isRetakingQuiz,
		questionsByCategories,
	} = useAppSelector(({ quiz }) => ({
		categoryQuestions: quiz.currentCategoryQuestions,
		currentCategoryIndex: quiz.currentCategoryIndex,
		dataStatus: quiz.dataStatus,
		isRetakingQuiz: quiz.isRetakingQuiz,
		questionsByCategories: quiz.questionsByCategories,
	}));

	const defaultValues = getQuizDefaultValues(questionsByCategories) as Record<
		string,
		string
	>;

	const { control, getValues, handleSubmit } = useAppForm<QuizFormValues>({
		defaultValues,
	});

	useEffect(() => {
		if (!isRetakingQuiz) {
			void dispatch(quizActions.getAllQuestions());
		}
	}, [dispatch, isRetakingQuiz]);

	useEffect(() => {
		setIsLast(
			currentCategoryIndex ===
				questionsByCategories.length - PREVIOUS_INDEX_OFFSET,
		);
	}, [currentCategoryIndex, questionsByCategories]);

	const handlePreviousStep = useCallback(() => {
		void dispatch(quizActions.previousQuestion());
	}, [dispatch]);

	useEffect(() => {
		if (categoryDone.includes(currentCategoryIndex)) {
			setIsDisabled(false);
		}
	}, [categoryDone, currentCategoryIndex]);

	const handleOnChange = useCallback(() => {
		if (!categoryQuestions) {
			return;
		}

		const questionLabels = categoryQuestions.map(
			(categoryItem) => `question${categoryItem.id.toString()}`,
		);
		const formValues = getValues();
		const hasUnansweredQuestions = questionLabels.some(
			(question) => !formValues[question],
		);

		if (!hasUnansweredQuestions) {
			if (!categoryDone.includes(currentCategoryIndex)) {
				setCategoryDone([...categoryDone, currentCategoryIndex]);
			}

			setIsDisabled(false);
		}
	}, [categoryQuestions, categoryDone, currentCategoryIndex, getValues]);

	const getAnswerIds = useCallback((formData: QuizFormValues) => {
		return Object.values(formData).map(Number);
	}, []);

	const handleNextStep = useCallback(
		(data: QuizFormValues) => {
			const questionFormAnswers = Object.fromEntries(
				Object.entries(data).filter(([key]) => key !== "answers"),
			);

			if (isLast) {
				const answerIds = getAnswerIds(questionFormAnswers);

				if (isRetakingQuiz) {
					const categoryIds = extractCategoryIdsFromQuestions(
						questionsByCategories,
					);

					void dispatch(quizActions.saveAnswers({ answerIds, categoryIds }));
					onNext();
					onNext();
				} else {
					void dispatch(quizActions.saveAnswers({ answerIds }));

					onNext();
				}
			}

			setIsDisabled(true);
			void dispatch(quizActions.nextQuestion());
		},
		[
			dispatch,
			getAnswerIds,
			isLast,
			isRetakingQuiz,
			questionsByCategories,
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
						numberOfSteps={questionsByCategories.length}
					/>
				</div>
				<h2 className={styles["quiz-header"]}>Wheel Quiz questions</h2>
				<div className={styles["questions-wrapper"]}>
					{isLoading ? (
						<div className={styles["loader"]}>
							<Loader />
						</div>
					) : (
						categoryQuestions?.map((question) => {
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
					{currentCategoryIndex !== ZERO_INDEX && (
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
							label={isLast ? "ANALYZE" : "NEXT"}
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
