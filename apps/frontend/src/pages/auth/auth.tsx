import ColorfullLogo from "~/assets/img/colorfull-logo.svg?react";
import RippleEffectBg from "~/assets/img/ripple-effect-bg.svg?react";
import RippleEffectBg2 from "~/assets/img/ripple-effect-bg2.svg?react";
import WhiteLogo from "~/assets/img/white-logo.svg?react";
import { Link, Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useLocation,
	useNavigate,
	useQuery,
} from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
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
import { authRouteToHeader } from "./libs/maps/maps.js";
import { type RoutesWithHeader } from "./libs/types/types.js";
import styles from "./styles.module.css";

const Auth: React.FC = () => {
	const { pathname } = useLocation();

	const { user } = useAppSelector(({ auth }) => ({
		user: auth.user,
	}));

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

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

	const { token } = useQuery();

	const handleResetPasswordSubmit = useCallback(
		(payload: Omit<ResetPasswordDto, "jwtToken">): void => {
			void dispatch(
				authActions.resetPassword({
					jwtToken: token as string,
					newPassword: payload.newPassword,
				}),
			);
		},
		[dispatch, token],
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

			case AppRoute.RESET_PASSWORD: {
				return (
					<ResetPasswordForm
						onSubmit={handleResetPasswordSubmit}
						token={token as string}
					/>
				);
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
						<ColorfullLogo />
					</div>

					<h1 className={styles["form-header__text"]}>
						{authRouteToHeader[pathname as ValueOf<RoutesWithHeader>]}
					</h1>
					<span className={styles["form-header__sub-text"]}>
						{pathname === AppRoute.FORGOT_PASSWORD && (
							<div>
								Enter your email address and we will send you a link to reset
								your password.
							</div>
						)}
						{pathname === AppRoute.SIGN_IN ? (
							<div>
								<span>No account? Go to </span>
								<Link to={AppRoute.SIGN_UP}>Create an account</Link>
							</div>
						) : (
							<div>
								<span>Already have an account? Go to </span>
								<Link to={AppRoute.SIGN_IN}>Sign In</Link>
							</div>
						)}
					</span>
				</div>
				{getScreen(pathname)}
			</div>
			<div className={styles["logo-container"]}>
				<WhiteLogo />
			</div>
		</div>
	);
};

export { Auth };
