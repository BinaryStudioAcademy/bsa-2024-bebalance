import { Button, Checkbox, Input } from "~/libs/components/components.js";
import { useAppForm, useAppSelector } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	notificationAnswersValidationSchema,
	type NotificationFrequency,
	type UserDto,
} from "~/modules/users/users.js";
import {
	NOTIFICATION_FREQUENCY_OPTIONS,
	TASK_DAYS_OPTIONS,
} from "~/pages/libs/constants/constants.js";
import { type NotificationQuestionsFormValues } from "~/pages/libs/types/types.js";

import styles from "./styles.module.css";

const Settings: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user) as UserDto;
	const { control } = useAppForm<NotificationQuestionsFormValues>({
		defaultValues: {
			notificationFrequency: user.notificationFrequency as ValueOf<
				typeof NotificationFrequency
			>,
			userTaskDays: user.userTaskDays as number[],
		},
		validationSchema: notificationAnswersValidationSchema,
	});

	return (
		<form className={styles["container"]}>
			<div className={styles["form-header"]}>
				<h1>Settings</h1>
				<Button label="save changes" type="submit" />
			</div>
			<Checkbox
				control={control}
				label="Day to receive tasks"
				name="userTaskDays"
				options={TASK_DAYS_OPTIONS}
			/>
			<Input
				control={control}
				label="Notification frequency"
				name="notificationFrequency"
				options={NOTIFICATION_FREQUENCY_OPTIONS}
				type="radio"
			/>
		</form>
	);
};

export { Settings };
