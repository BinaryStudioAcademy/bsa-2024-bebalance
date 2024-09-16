import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserUpdatePasswordFormDto,
	type UserUpdatePasswordRequestDto,
	userUpdatePasswordValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_UPDATE_PASSWORD_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (
		payload: Omit<UserUpdatePasswordRequestDto, "email" | "jwtToken">,
	) => void;
};

const UpdatePasswordForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
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

	return (
		<form className={styles["form"]} onSubmit={handleFormSubmit}>
			<Input
				control={control}
				errors={errors}
				label="Current Password"
				name="currentPassword"
				placeholder="••••••"
				type="password"
			/>
			<Input
				control={control}
				errors={errors}
				label="New Password"
				name="newPassword"
				placeholder="••••••"
				type="password"
			/>
			<Input
				control={control}
				errors={errors}
				label="Confirm New Password"
				name="confirmPassword"
				placeholder="••••••"
				type="password"
			/>
			<Button label="SAVE" type="submit" />
		</form>
	);
};

export { UpdatePasswordForm };
