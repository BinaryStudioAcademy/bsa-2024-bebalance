import RippleEffectBg from "~/assets/img/ripple-effect-bg.svg?react";
import RippleEffectBg2 from "~/assets/img/ripple-effect-bg2.svg?react";
import { Link, Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useLocation,
	useNavigate,
	useParams,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type EmailDto,
	type ResetPasswordDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import {
	ForgotPasswordForm,
	ResetPasswordForm,
	SignInForm,
	SignUpForm,
} from "./libs/components/components.js";
import { getFormHeader } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const Auth: React.FC = () => {
	const { pathname } = useLocation();

	const { user } = useAppSelector(({ auth }) => ({
		user: auth.user,
	}));

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { token } = useParams();

	const handleSignInSubmit = useCallback(
		(payload: UserSignInRequestDto): void => {
			void dispatch(authActions.signIn(payload));
		},
		[dispatch],
	);

	const handleSignUpSubmit = useCallback(
		(payload: UserSignUpRequestDto): void => {
			void dispatch(authActions.signUp(payload));
		},
		[dispatch],
	);

	const handleForgotPasswordSubmit = useCallback(
		(payload: EmailDto): void => {
			void dispatch(authActions.requestResetPassword(payload));
			navigate(AppRoute.SIGN_IN);
		},
		[dispatch, navigate],
	);

	const handleResetPasswordSubmit = useCallback(
		(payload: Omit<ResetPasswordDto, "jwtToken">): void => {
			void dispatch(
				authActions.resetPassword({
					jwtToken: token as string,
					newPassword: payload.newPassword,
				}),
			);
			navigate(AppRoute.SIGN_IN);
		},
		[dispatch, navigate, token],
	);

	const getScreen = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.SIGN_IN: {
				return <SignInForm onSubmit={handleSignInSubmit} />;
			}

			case AppRoute.SIGN_UP: {
				return <SignUpForm onSubmit={handleSignUpSubmit} />;
			}

			case AppRoute.FORGOT_PASSWORD: {
				return <ForgotPasswordForm onSubmit={handleForgotPasswordSubmit} />;
			}

			case `${AppRoute.RESET_PASSWORD}/${token as string}`: {
				return <ResetPasswordForm onSubmit={handleResetPasswordSubmit} />;
			}
		}
	};

	const hasUser = Boolean(user);

	if (hasUser) {
		return <Navigate replace to={AppRoute.ROOT} />;
	}

	return (
		<div className={styles["auth-container"]}>
			<RippleEffectBg className={styles["ripple-effect__background1"]} />
			<RippleEffectBg2 className={styles["ripple-effect__background2"]} />
			<div className={styles["white-dots"]} />
			<div className={styles["form-container"]}>
				<div className={styles["form-header"]}>
					<div className={styles["form-header__logo-container"]}>
						<div className={styles["form-header__logo"]} />
						<span className={styles["form-header__logo-text"]}>logo</span>
					</div>

					<h1 className={styles["form-header__text"]}>
						{getFormHeader(pathname)}
					</h1>
					<span className={styles["form-header__sub-text"]}>
						{pathname === AppRoute.SIGN_IN ? (
							<>
								<span>No account? Go to </span>
								<Link to={AppRoute.SIGN_UP}>Create an account</Link>
							</>
						) : (
							<>
								<span>Already have an account? Go to </span>
								<Link to={AppRoute.SIGN_IN}>Sign In</Link>
							</>
						)}
					</span>
				</div>
				{getScreen(pathname)}
			</div>
			<div className={styles["title-container"]}>
				<h1 className={styles["title"]}>Logo</h1>
			</div>
		</div>
	);
};

export { Auth };
