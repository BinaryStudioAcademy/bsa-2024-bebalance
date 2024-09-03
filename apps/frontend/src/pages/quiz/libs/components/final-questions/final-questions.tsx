import { QuizQuestion } from "~/libs/components/components.js";
import { useAppForm } from "~/libs/hooks/hooks.js";

type FormValues = {
	value: string[];
};

const FinalQuestions: React.FC = () => {
	const { control } = useAppForm<FormValues>({
		defaultValues: { value: [""] },
	});

	return (
		<form>
			<QuizQuestion
				control={control}
				label="Which days would you like to receive tasks"
				name="userTaskDays"
				options={[
					{ label: "Monday", value: "1" },
					{ label: "Tuesday", value: "2" },
					{ label: "Wednesday", value: "3" },
					{ label: "Thursday", value: "4" },
					{ label: "Friday", value: "5" },
					{ label: "Saturday", value: "6" },
					{ label: "Sunday", value: "7" },
				]}
				type="checkbox"
			/>
		</form>
	);
};

export { FinalQuestions };
