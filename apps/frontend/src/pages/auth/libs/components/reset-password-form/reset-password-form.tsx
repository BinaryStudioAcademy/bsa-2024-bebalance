import { Button, Input } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import {
	useAppDispatch,
	useAppForm,
	useCallback,
	useNavigate,
	useParams,
} from "~/libs/hooks/hooks.js";
import { notification } from "~/libs/modules/notification/notification.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type ResetPasswordDto,
	userResetPasswordValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_RESET_PASSWORD_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const ResetPasswordForm: React.FC = () => {
	const { control, errors, handleSubmit } = useAppForm<
		Omit<ResetPasswordDto, "jwtToken">
	>({
		defaultValues: DEFAULT_RESET_PASSWORD_PAYLOAD,
		validationSchema: userResetPasswordValidationSchema,
	});

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { token } = useParams();

	const handleResetPasswordSubmit = useCallback(
		(payload: Omit<ResetPasswordDto, "jwtToken">): void => {
			if (!token) {
				notification.error("invalid reset password url");

				return;
			}

			void dispatch(
				authActions.resetPassword({
					jwtToken: token,
					newPassword: payload.newPassword,
				}),
			);
			navigate(AppRoute.SIGN_IN);
		},
		[dispatch, navigate, token],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleResetPasswordSubmit)(event_);
		},
		[handleSubmit, handleResetPasswordSubmit],
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
