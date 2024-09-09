// import { Checkbox, Input } from "~/libs/components/components.js";
// import { useAppForm, useAppSelector } from "~/libs/hooks/hooks.js";
// import {
// 	notificationAnswersValidationSchema,
// 	type UserDto,
// } from "~/modules/users/users.js";
// import {
// 	NOTIFICATION_FREQUENCY_OPTIONS,
// 	TASK_DAYS_OPTIONS,
// } from "~/pages/libs/constants/constants.js";

// import { type NotificationQuestionsFormValues } from "../libs/types/notification-questions-form-values.types.js";
import styles from "./styles.module.css";

const Settings: React.FC = () => {
	// const user = useAppSelector((state) => state.auth.user) as UserDto;
	// const { control } = useAppForm<NotificationQuestionsFormValues>({
	// 	defaultValues: {
	// 		notificationFrequency: user.notificationFrequency,
	// 		userTaskDays: user.userTaskDays,
	// 	},
	// 	validationSchema: notificationAnswersValidationSchema,
	// });

	return (
		<div className={styles["container"]}>
			{/* <h1>Settings</h1>
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
			/> */}
		</div>
	);
};

export { Settings };
