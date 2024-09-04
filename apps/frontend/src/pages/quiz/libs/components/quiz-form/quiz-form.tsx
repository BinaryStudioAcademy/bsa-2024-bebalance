import { QuizQuestion } from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";

type FormValues = {
	value: string;
};

const QuizForm: React.FC = () => {
	const { control } = useAppForm<FormValues>({
		defaultValues: { value: "" },
	});

	return (
		<form>
			<QuizQuestion control={control} label="" name="" options={[]} />
		</form>
	);
};

export { QuizForm };
