import runImg from "~/assets/img/run.svg";
import {
	Button,
	Checkbox,
	Input,
	Popup,
} from "~/libs/components/components.js";
import {
	NOTIFICATION_FREQUENCY_OPTIONS,
	TASK_DAYS_OPTIONS,
} from "~/libs/constants/constants.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useBlocker,
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

import styles from "./styles.module.css";

const Settings: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user) as UserDto;
	const { control, handleSubmit, isDirty, reset } =
		useAppForm<NotificationQuestionsFormValues>({
			defaultValues: {
				notificationFrequency: user.notificationFrequency as ValueOf<
					typeof NotificationFrequency
				>,
				userTaskDays: user.userTaskDays as number[],
			},
			validationSchema: notificationAnswersValidationSchema,
		});

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

	const blocker = useBlocker(({ currentLocation, nextLocation }) => {
		return isDirty && currentLocation.pathname !== nextLocation.pathname;
	});

	const handleCancelPopupClick = useCallback((): void => {
		if (blocker.state === "blocked") {
			blocker.reset();
		}
	}, [blocker]);

	const handleConfirmPopupClick = useCallback((): void => {
		reset();

		if (blocker.state === "blocked") {
			blocker.proceed();
		}
	}, [blocker, reset]);

	return (
		<>
			<div>
				<h1 className={styles["header"]}>Settings</h1>
				<form className={styles["container"]} onSubmit={handleFormSubmit}>
					<div className={styles["inputs"]}>
						<div className={styles["notification-days-input"]}>
							<Checkbox
								control={control}
								label="Days to receive tasks"
								name="userTaskDays"
								options={TASK_DAYS_OPTIONS}
							/>
						</div>
						<hr className={styles["breakline"]} />
						<div className={styles["notification-frequency-input"]}>
							<div className={styles["width-limit"]}>
								<Input
									control={control}
									label="Notification frequency"
									name="notificationFrequency"
									options={NOTIFICATION_FREQUENCY_OPTIONS}
									type="radio"
								/>
							</div>
						</div>
					</div>
					<div className="button-container">
						<Button label="save changes" type="submit" />
					</div>
				</form>
			</div>
			<Popup
				closeButtonLabel="CANCEL"
				confirmButtonLabel="YES"
				hasCloseIcon
				icon={runImg}
				isOpen={isDirty && blocker.state === "blocked"}
				onClose={handleCancelPopupClick}
				onConfirm={handleConfirmPopupClick}
				title="Unsaved changes will be lost. Continue?"
			/>
		</>
	);
};

export { Settings };
