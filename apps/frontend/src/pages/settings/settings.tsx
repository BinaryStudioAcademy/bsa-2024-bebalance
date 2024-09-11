import { Button, Checkbox, Input } from "~/libs/components/components.js";
import { TASK_DAYS_OPTIONS } from "~/libs/constants/constants.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import {
	type NotificationQuestionsFormValues,
	type ValueOf,
} from "~/libs/types/types.js";
import {
	type NotificationAnswersPayloadDto,
	notificationAnswersValidationSchema,
	type NotificationFrequency,
	actions as userActions,
	type UserDto,
} from "~/modules/users/users.js";

import { SETTINGS_NOTIFICATION_FREQUENCY_OPTIONS } from "./libs/constants/constants.js";
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
		<div>
			<h1 className={styles["header"]}>Settings</h1>
			<form className={styles["container"]} onSubmit={handleFormSubmit}>
				<div className={styles["inputs"]}>
					<div className={styles["notification-days-input"]}>
						<Checkbox
							control={control}
							label="Day to receive tasks"
							name="userTaskDays"
							options={TASK_DAYS_OPTIONS}
						/>
					</div>
					<hr className={styles["breakline"]} />
					<div className={styles["notification-frequency-input"]}>
						<Input
							control={control}
							label="Notification frequency"
							name="notificationFrequency"
							options={SETTINGS_NOTIFICATION_FREQUENCY_OPTIONS}
							type="radio"
						/>
					</div>
				</div>
				<div className="button-container">
					<Button label="save changes" type="submit" />
				</div>
			</form>
		</div>
	);
};

export { Settings };
