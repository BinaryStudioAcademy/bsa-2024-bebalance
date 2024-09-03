import { QuizQuestion } from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";

type FormValues = {
	answer: "";
};

const QuizForm: React.FC = () => {
	const { control } = useAppForm<FormValues>({
		defaultValues: { answer: "" },
	});

	return (
		<form>
			<QuizQuestion control={control} name="answer" />
		</form>
	);
};

export { QuizForm };
