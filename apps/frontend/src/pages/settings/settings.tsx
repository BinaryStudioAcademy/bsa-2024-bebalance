import { Button, Checkbox, Input } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type NotificationAnswersPayloadDto,
	notificationAnswersValidationSchema,
	type NotificationFrequency,
	actions as userActions,
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
	const { control, handleSubmit } = useAppForm<NotificationQuestionsFormValues>(
		{
			defaultValues: {
				notificationFrequency: user.notificationFrequency as ValueOf<
					typeof NotificationFrequency
				>,
				userTaskDays: user.userTaskDays as number[],
			},
			validationSchema: notificationAnswersValidationSchema,
		},
	);

	const dispatch = useAppDispatch();

	const handleNotificationQuestionsSubmit = useCallback(
		(payload: NotificationAnswersPayloadDto): void => {
			void dispatch(userActions.saveNotificationAnswers(payload));
		},
		[dispatch],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((payload) => {
				handleNotificationQuestionsSubmit(payload);
			})(event_);
		},
		[handleNotificationQuestionsSubmit, handleSubmit],
	);

	return (
		<form className={styles["container"]} onSubmit={handleFormSubmit}>
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
