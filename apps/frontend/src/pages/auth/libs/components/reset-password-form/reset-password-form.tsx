import { Button, Input, Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type ResetPasswordDto,
	type ResetPasswordFormDto,
	userResetPasswordValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_RESET_PASSWORD_PAYLOAD } from "./libs/constants/constants.js";
import { ConfirmPasswordCustomValidation } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: Omit<ResetPasswordDto, "jwtToken">) => void;
	token: string;
};

const ResetPasswordForm: React.FC<Properties> = ({
	onSubmit,
	token,
}: Properties) => {
	const dataStatus = useAppSelector((state) => state.auth.dataStatus);
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState<boolean>(false);

	const { control, errors, getValues, handleSubmit, isValid, setError, watch } =
		useAppForm<ResetPasswordFormDto>({
			defaultValues: DEFAULT_RESET_PASSWORD_PAYLOAD,
			validationSchema: userResetPasswordValidationSchema,
		});

	const newPasswordValue = watch("newPassword", "");
	const confirmPasswordValue = watch("confirmPassword", "");

	const dispatch = useAppDispatch();

	const handleResetPasswordLinkValidityCheck = useCallback((): void => {
		void dispatch(
			authActions.checkResetPasswordLinkExpiration({ link: token }),
		);
	}, [dispatch, token]);

	useEffect(() => {
		handleResetPasswordLinkValidityCheck();
	}, [handleResetPasswordLinkValidityCheck]);

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

	if (dataStatus === DataStatus.PENDING) {
		return <Loader />;
	}

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
				<Button
					isDisabled={!isValid || newPasswordValue !== confirmPasswordValue}
					label="SAVE PASSWORD"
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
