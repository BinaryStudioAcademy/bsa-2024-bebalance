import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks.js";
import {
	type SavePasswordDto,
	type SavePasswordFormDto,
	userResetPasswordValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SAVE_PASSWORD_PAYLOAD } from "./libs/constants/constants.js";
import { ConfirmPasswordCustomValidation } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: Omit<SavePasswordDto, "jwtToken">) => void;
};

const SavePasswordForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState<boolean>(false);

	const { control, errors, getValues, handleSubmit, setError } =
		useAppForm<SavePasswordFormDto>({
			defaultValues: DEFAULT_SAVE_PASSWORD_PAYLOAD,
			validationSchema: userResetPasswordValidationSchema,
		});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((payload) => {
				const { newPassword } = payload;
				const confirmPassword = getValues("confirmPassword");

				if (confirmPassword === newPassword) {
					onSubmit({
						newPassword,
					});
				} else {
					setError(ConfirmPasswordCustomValidation.FIELD, {
						message: ConfirmPasswordCustomValidation.ERROR_MESSAGE,
						type: ConfirmPasswordCustomValidation.ERROR_TYPE,
					});
				}
			})(event_);
		},
		[handleSubmit, onSubmit, setError, getValues],
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible((previousState) => !previousState);
	}, []);

	const handleToggleConfirmPasswordVisibility = useCallback(() => {
		setIsConfirmPasswordVisible((previousState) => !previousState);
	}, []);

	return (
		<>
			<form className={styles["form"]} onSubmit={handleFormSubmit}>
				<Input
					control={control}
					errors={errors}
					iconName={isPasswordVisible ? "crossedEye" : "eye"}
					label="Password"
					name="newPassword"
					onIconClick={handleTogglePasswordVisibility}
					placeholder="*******"
					type={isPasswordVisible ? "text" : "password"}
				/>

				<Input
					control={control}
					errors={errors}
					iconName={isConfirmPasswordVisible ? "crossedEye" : "eye"}
					label="Confirm password"
					name="confirmPassword"
					onIconClick={handleToggleConfirmPasswordVisibility}
					placeholder="*******"
					type={isConfirmPasswordVisible ? "text" : "password"}
				/>
				<Button label="SAVE PASSWORD" type="submit" />
			</form>

			<div className={styles["circle-gradient1"]} />
			<div className={styles["circle-gradient2"]} />
			<div className={styles["circle-gradient3"]} />
			<div className={styles["circle-gradient4"]} />
		</>
	);
};

export { SavePasswordForm };
