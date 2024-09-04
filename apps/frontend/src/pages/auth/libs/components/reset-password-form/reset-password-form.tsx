import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type EmailDto,
	userForgotPasswordValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_RESET_PASSWORD_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: EmailDto) => void;
};

const ResetPasswordForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit, watch } = useAppForm<EmailDto>({
		defaultValues: DEFAULT_RESET_PASSWORD_PAYLOAD,
		validationSchema: userForgotPasswordValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[onSubmit, handleSubmit],
	);

	const email = watch("email", "");

	return (
		<>
			<form className={styles["form"]} onSubmit={handleFormSubmit}>
				<Input
					control={control}
					errors={errors}
					label="Email"
					name="email"
					placeholder="name@example.com"
					type="email"
				/>

				<Button
					isDisabled={email === ""}
					label="RESET PASSWORD"
					type="submit"
				/>
			</form>

			<div className={styles["circle-gradient1"]} />
			<div className={styles["circle-gradient2"]} />
			<div className={styles["circle-gradient3"]} />
			<div className={styles["circle-gradient4"]} />
		</>
	);
};

export { ResetPasswordForm };
