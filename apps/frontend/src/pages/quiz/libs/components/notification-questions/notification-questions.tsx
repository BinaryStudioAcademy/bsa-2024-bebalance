import { Button, Checkbox, Input } from "~/libs/components/components.js";
import {
	NOTIFICATION_FREQUENCY_OPTIONS,
	TASK_DAYS_OPTIONS,
} from "~/libs/constants/constants.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import { type NotificationQuestionsFormValues } from "~/libs/types/types.js";
import {
	type NotificationAnswersPayloadDto,
	notificationAnswersValidationSchema,
} from "~/modules/users/users.js";

import { NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: NotificationAnswersPayloadDto) => void;
};

const NotificationQuestions: React.FC<Properties> = ({
	onSubmit,
}: Properties) => {
	const { control, handleSubmit, isValid } =
		useAppForm<NotificationQuestionsFormValues>({
			defaultValues: NOTIFICATION_QUESTIONS_FORM_DEFAULT_VALUES,
			validationSchema: notificationAnswersValidationSchema,
		});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((payload) => {
				onSubmit(payload);
			})(event_);
		},
		[onSubmit, handleSubmit],
	);

	return (
		<div className={styles["container"]}>
			<div className={styles["notification-questions"]}>
				<h1 className={styles["title"]}>And the last step</h1>
				<form className={styles["form"]} onSubmit={handleFormSubmit}>
					<Checkbox
						control={control}
						label="Which days would you like to receive tasks?"
						name="userTaskDays"
						options={TASK_DAYS_OPTIONS}
						tip="Quick tip: We recommend selecting at least 3 days in order to achieve your life balance."
					/>
					<Input
						control={control}
						isFullWidth
						label="How would you like to receive motivational follow-ups?"
						name="notificationFrequency"
						options={NOTIFICATION_FREQUENCY_OPTIONS}
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

export { NotificationQuestions };
