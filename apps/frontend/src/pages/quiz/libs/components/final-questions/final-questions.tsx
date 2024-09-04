import { Button, Checkbox, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import { type UserPreferencesPayloadDto } from "~/modules/users/users.js";

import { FINAL_QUESTIONS_FORM_DEFAULT_VALUES } from "../../constants/final-questions-form-default-values.constant.js";
import { type FinalQuestionsFormValues } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserPreferencesPayloadDto) => void;
};

const FinalQuestions: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, handleSubmit } = useAppForm<FinalQuestionsFormValues>({
		defaultValues: FINAL_QUESTIONS_FORM_DEFAULT_VALUES,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(({ allowNotifications, userTaskDays }) => {
				onSubmit({
					allowNotifications: allowNotifications === "true",
					userTaskDays: userTaskDays.map(Number),
				});
			})(event_);
		},
		[onSubmit, handleSubmit],
	);

	return (
		<>
			<h1 className={styles["title"]}>And the last step</h1>
			<form className={styles["form"]} onSubmit={handleFormSubmit}>
				<Checkbox
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
				/>
				<Input
					control={control}
					label="How would you like to receive motivational follow-ups?"
					name="allowNotifications"
					options={[
						{ label: "Yes, I’d love daily motivation!", value: "true" },
						{
							label: "No, I prefer not to receive motivational follow-ups",
							value: "false",
						},
					]}
					type="radio"
				/>
				<Button label="Next" type="submit" />
			</form>
		</>
	);
};

export { FinalQuestions };
