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
import {
	categoryAnswerSelectedValidationSchema,
	actions as quizActions,
} from "~/modules/quiz/quiz.js";

import { QUIZ_FORM_DEFAULT_VALUES } from "../../constants/constants.js";
import { type QuizFormValues } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	onNext: () => void;
};

const ONE_STEP_OFFSET = 1;

const QuizForm: React.FC<Properties> = ({ onNext }: Properties) => {
	const dispatch = useAppDispatch();
	const [isLast, setIsLast] = useState<boolean>(false);

	const { control, handleSubmit, reset } = useAppForm<QuizFormValues>({
		defaultValues: QUIZ_FORM_DEFAULT_VALUES,
		validationSchema: categoryAnswerSelectedValidationSchema,
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

	const handleNextStep = useCallback(() => {
		if (isLast) {
			return;
		}

		void dispatch(quizActions.nextQuestion());
		reset();
	}, [dispatch, isLast, reset]);

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
									label={question.label}
									name={question.id.toString()}
									options={answerOptions}
								/>
							);
						})
					)}
				</div>
				<div className={styles["form-footer"]}>
					<div className={styles["button-container"]}>
						<Button
							label="BACK"
							onClick={handlePreviousStep}
							variant="secondary"
						/>
					</div>
					<div className={styles["button-container"]}>
						{isLast ? (
							<Button label="CONTINUE" onClick={onNext} type="submit" />
						) : (
							<Button label="NEXT" onClick={handleNextStep} type="submit" />
						)}
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
