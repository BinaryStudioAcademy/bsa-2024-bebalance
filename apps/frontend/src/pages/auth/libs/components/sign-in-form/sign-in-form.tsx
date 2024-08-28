import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import {
	useAppDispatch,
	useAppForm,
	useCallback,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_IN_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const SignInForm: React.FC = () => {
	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
		validationSchema: userSignInValidationSchema,
	});
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const handleSignInSubmit = useCallback(
		(payload: UserSignInRequestDto): void => {
			void dispatch(authActions.signIn(payload));
		},
		[dispatch],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleSignInSubmit)(event_);
		},
		[handleSignInSubmit, handleSubmit],
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible((previousState) => !previousState);
	}, []);

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

				<Input
					control={control}
					errors={errors}
					iconName={isPasswordVisible ? "crossedEye" : "eye"}
					label="Password"
					name="password"
					onIconClick={handleTogglePasswordVisibility}
					placeholder="*******"
					type={isPasswordVisible ? "text" : "password"}
				/>

				<Button label="SIGN IN" type="submit" />
				<div className={styles["forgot-password-container"]}>
					<Link to={AppRoute.FORGOT_PASSWORD}>Forgot password?</Link>
				</div>
			</form>

			<div className={styles["circle-gradient1"]} />
			<div className={styles["circle-gradient2"]} />
			<div className={styles["circle-gradient3"]} />
			<div className={styles["circle-gradient4"]} />
		</>
	);
};

export { SignInForm };
