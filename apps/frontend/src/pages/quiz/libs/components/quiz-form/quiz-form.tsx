import { QuizQuestion } from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";

type FormValues = {
	value: string;
};

const QuizForm = () => {
	const { control } = useAppForm<FormValues>({
		defaultValues: { value: "" },
	});

	return (
		<form>
			<QuizQuestion control={control} />
		</form>
	);
};

export { QuizForm };
