import { Loader, QuizQuestion } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import styles from "./styles.module.css";

type FormValues = {
	value: string;
};

const QuizForm: React.FC = () => {
	const dispatch = useAppDispatch();
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

	const isLoading = dataStatus === DataStatus.PENDING;

	return (
		<div className={styles["quiz-form"]}>
			<form className={styles["questions-wrapper"]}>
				<h2 className={styles["quiz-header"]}>Wheel Quiz questions</h2>
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
			</form>
		</div>
	);
};

export { QuizForm };
