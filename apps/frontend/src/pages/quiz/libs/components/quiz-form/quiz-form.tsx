import { QuizQuestion } from "~/libs/components/components.js";
import { useAppDispatch, useAppForm, useEffect } from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

type FormValues = {
	value: string;
};

const QuizForm: React.FC = () => {
	const { control } = useAppForm<FormValues>({
		defaultValues: { value: "" },
	});

	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(quizActions.getQuestions());
	}, [dispatch]);

	return (
		<form>
			<QuizQuestion control={control} />
		</form>
	);
};

export { QuizForm };
