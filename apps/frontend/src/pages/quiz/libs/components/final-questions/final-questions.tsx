import { Button, Checkbox, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type FinalAnswersPayloadDto,
	finalAnswersValidationSchema,
} from "~/modules/users/users.js";

import {
	ALLOW_NOTIFICATIONS_OPTIONS,
	FINAL_QUESTIONS_FORM_DEFAULT_VALUES,
	TASK_DAYS_OPTIONS,
} from "./libs/constants/constants.js";
import { type FinalQuestionsFormValues } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: FinalAnswersPayloadDto) => void;
};

const FinalQuestions: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, handleSubmit, isValid } =
		useAppForm<FinalQuestionsFormValues>({
			defaultValues: FINAL_QUESTIONS_FORM_DEFAULT_VALUES,
			validationSchema: finalAnswersValidationSchema,
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
		<div className={styles["container"]}>
			<div className={styles["final-questions"]}>
				<h1 className={styles["title"]}>And the last step</h1>
				<form className={styles["form"]} onSubmit={handleFormSubmit}>
					<Checkbox
						control={control}
						label="Which days would you like to receive tasks"
						name="userTaskDays"
						options={TASK_DAYS_OPTIONS}
					/>
					<Input
						control={control}
						isFullWidth
						label="How would you like to receive motivational follow-ups?"
						name="allowNotifications"
						options={ALLOW_NOTIFICATIONS_OPTIONS}
						type="radio"
					/>
					<div className={styles["button-container"]}>
						<Button isDisabled={!isValid} label="Next" type="submit" />
					</div>
				</form>
			</div>
		</div>
	);
};

export { FinalQuestions };
