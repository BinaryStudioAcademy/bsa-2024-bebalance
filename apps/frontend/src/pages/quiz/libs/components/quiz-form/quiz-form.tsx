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

const QuizForm: React.FC<Properties> = ({ onNext }: Properties) => {
	const dispatch = useAppDispatch();
	const [isLast, setIsLast] = useState<boolean>(false);

	const { control, handleSubmit } = useAppForm<QuizFormValues>({
		defaultValues: QUIZ_FORM_DEFAULT_VALUES,
	});

	const { category, currentCategoryIndex, dataStatus, questions, userId } =
		useAppSelector(({ auth, quiz }) => ({
			category: quiz.currentCategory,
			currentCategoryIndex: quiz.currentCategoryIndex,
			dataStatus: quiz.dataStatus,
			questions: quiz.questions,
			userId: auth.user?.id,
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

	const isValueUndefined = useCallback(
		(formData: FormToSave, keysToCheck: string[]): boolean => {
			return keysToCheck.some((key) => formData[key] === undefined);
		},
		[],
	);

	const getAnswerIds = useCallback((formData: FormToSave) => {
		return Object.values(formData).map(Number);
	}, []);

	const handleNextStep = useCallback(
		(data: QuizFormValues) => {
			if (category) {
				const ids = category.map(
					(categoryItem) => `answer${categoryItem.id.toString()}`,
				);
				const hasUndefined = isValueUndefined(data, ids);

				if (!hasUndefined) {
					const newObject = Object.fromEntries(
						Object.entries(data).filter(([key]) => key !== "answer0"),
					);

					if (isLast && userId) {
						const answerIds = getAnswerIds(newObject);

						void dispatch(quizActions.saveAnswers({ answerIds, userId }));

						onNext();
					}

					void dispatch(quizActions.nextQuestion());
				}
			}
		},
		[
			category,
			dispatch,
			getAnswerIds,
			isLast,
			isValueUndefined,
			onNext,
			userId,
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
			<form className={styles["questions-form"]} onSubmit={handleFormSubmit}>
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
									name={`answer${question.id.toString()}`}
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
						<Button label="CONTINUE" type="submit" />
					) : (
						<Button label="NEXT" type="submit" />
					)}
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
