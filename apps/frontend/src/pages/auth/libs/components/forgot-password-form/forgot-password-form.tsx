import { Button, Input } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import {
	useAppDispatch,
	useAppForm,
	useCallback,
	useNavigate,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type EmailDto,
	userForgotPasswordValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_FORGOT_PASSWORD_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const ForgotPasswordForm: React.FC = () => {
	const { control, errors, handleSubmit } = useAppForm<EmailDto>({
		defaultValues: DEFAULT_FORGOT_PASSWORD_PAYLOAD,
		validationSchema: userForgotPasswordValidationSchema,
	});

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleForgotPasswordSubmit = useCallback(
		(payload: EmailDto): void => {
			void dispatch(authActions.sendResetPasswordLink(payload));
			navigate(AppRoute.SIGN_IN);
		},
		[dispatch, navigate],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleForgotPasswordSubmit)(event_);
		},
		[handleSubmit, handleForgotPasswordSubmit],
	);

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

				<Button label="SEND LINK" type="submit" variant="dark" />
			</form>

			<div className={styles["circle-gradient1"]} />
			<div className={styles["circle-gradient2"]} />
			<div className={styles["circle-gradient3"]} />
			<div className={styles["circle-gradient4"]} />
		</>
	);
};

export { ForgotPasswordForm };
