import runImg from "~/assets/img/run.svg";
import { Button, Input, Popup } from "~/libs/components/components.js";
import {
	useAppForm,
	useBlocker,
	useCallback,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type UserUpdatePasswordFormDto,
	type UserUpdatePasswordRequestDto,
	userUpdatePasswordValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_UPDATE_PASSWORD_PAYLOAD } from "./libs/constants/constants.js";
import { ConfirmPasswordCustomValidation } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserUpdatePasswordRequestDto) => void;
};

const UpdatePasswordForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
		useState<boolean>(false);
	const [isNewPasswordVisible, setIsNewPasswordVisible] =
		useState<boolean>(false);
	const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
		useState<boolean>(false);

	const { control, errors, getValues, handleSubmit, isDirty, reset, setError } =
		useAppForm<UserUpdatePasswordFormDto>({
			defaultValues: DEFAULT_UPDATE_PASSWORD_PAYLOAD,
			validationSchema: userUpdatePasswordValidationSchema,
		});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((payload: UserUpdatePasswordRequestDto) => {
				const { confirmNewPassword } = getValues();
				const { newPassword } = payload;

				if (confirmNewPassword === newPassword) {
					onSubmit(payload);
				} else {
					setError(ConfirmPasswordCustomValidation.FIELD.CONFIRM_NEW_PASSWORD, {
						message: ConfirmPasswordCustomValidation.ERROR_MESSAGE,
						type: ConfirmPasswordCustomValidation.ERROR_TYPE,
					});
				}
			})(event_);
		},
		[handleSubmit, onSubmit, setError, getValues],
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsCurrentPasswordVisible((previousState) => !previousState);
	}, []);

	const handleToggleNewPasswordVisibility = useCallback(() => {
		setIsNewPasswordVisible((previousState) => !previousState);
	}, []);

	const handleToggleConfirmNewPasswordVisibility = useCallback(() => {
		setIsConfirmNewPasswordVisible((previousState) => !previousState);
	}, []);

	const blocker = useBlocker(isDirty);

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
			<form className={styles["form"]} onSubmit={handleFormSubmit}>
				<Input
					control={control}
					errors={errors}
					iconName={isCurrentPasswordVisible ? "crossedEye" : "eye"}
					label="Current Password"
					name="currentPassword"
					onIconClick={handleTogglePasswordVisibility}
					placeholder="••••••"
					type={isCurrentPasswordVisible ? "text" : "password"}
				/>
				<Input
					control={control}
					errors={errors}
					iconName={isNewPasswordVisible ? "crossedEye" : "eye"}
					label="New Password"
					name="newPassword"
					onIconClick={handleToggleNewPasswordVisibility}
					placeholder="••••••"
					type={isNewPasswordVisible ? "text" : "password"}
				/>
				<Input
					control={control}
					errors={errors}
					iconName={isConfirmNewPasswordVisible ? "crossedEye" : "eye"}
					label="Confirm New Password"
					name="confirmNewPassword"
					onIconClick={handleToggleConfirmNewPasswordVisibility}
					placeholder="••••••"
					type={isConfirmNewPasswordVisible ? "text" : "password"}
				/>
				<Button label="SAVE" type="submit" />
			</form>
		</>
	);
};

export { UpdatePasswordForm };
