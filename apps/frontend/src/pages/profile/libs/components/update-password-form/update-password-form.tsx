import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks.js";
import {
	type UserUpdatePasswordFormDto,
	type UserUpdatePasswordRequestDto,
	userUpdatePasswordValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_UPDATE_PASSWORD_PAYLOAD } from "./libs/constants/constants.js";
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

	const { control, errors, handleSubmit } =
		useAppForm<UserUpdatePasswordFormDto>({
			defaultValues: DEFAULT_UPDATE_PASSWORD_PAYLOAD,
			validationSchema: userUpdatePasswordValidationSchema,
		});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
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

	return (
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
	);
};

export { UpdatePasswordForm };
