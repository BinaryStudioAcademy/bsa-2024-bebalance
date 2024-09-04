import { QuizQuestion } from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";

type FormValues = {
	[key: string]: number;
};

const QuizForm: React.FC = () => {
	const { control } = useAppForm<FormValues>({
		defaultValues: { answer: 0 },
	});

	return (
		<form>
			<QuizQuestion control={control} name="" options={[]} />
		</form>
	);
};

export { QuizForm };
