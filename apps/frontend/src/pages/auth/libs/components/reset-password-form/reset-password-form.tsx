import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback, useParams } from "~/libs/hooks/hooks.js";
import { notification } from "~/libs/modules/notification/notification.js";
import {
	type ResetPasswordDto,
	userResetPasswordValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_RESET_PASSWORD_PAYLOAD } from "./libs/constants/constants.js";
import { ConfirmPasswordCustomValidation } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: Omit<ResetPasswordDto, "confirmPassword">) => void;
};

const ResetPasswordForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, getValues, handleSubmit, setError } = useAppForm<
		Omit<ResetPasswordDto, "jwtToken">
	>({
		defaultValues: DEFAULT_RESET_PASSWORD_PAYLOAD,
		validationSchema: userResetPasswordValidationSchema,
	});

	const { token } = useParams();

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((payload) => {
				if (!token) {
					notification.error("invalid reset password url");

					return;
				}

				const { newPassword } = payload;
				const confirmPassword = getValues("confirmPassword");

				if (confirmPassword === newPassword) {
					onSubmit({
						jwtToken: token,
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
		[handleSubmit, onSubmit, setError, getValues, token],
	);

	return (
		<>
			<form className={styles["form"]} onSubmit={handleFormSubmit}>
				<Input
					control={control}
					errors={errors}
					label="New password"
					name="newPassword"
					placeholder="********"
					type="password"
				/>

				<Input
					control={control}
					errors={errors}
					label="Confirm password"
					name="confirmPassword"
					placeholder="********"
					type="password"
				/>
				<Button label="RESET PASSWORD" type="submit" />
			</form>

			<div className={styles["circle-gradient1"]} />
			<div className={styles["circle-gradient2"]} />
			<div className={styles["circle-gradient3"]} />
			<div className={styles["circle-gradient4"]} />
		</>
	);
};

export { ResetPasswordForm };
