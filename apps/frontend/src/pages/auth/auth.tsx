import RippleEffectBg from "~/assets/img/ripple-effect-bg.svg?react";
import RippleEffectBg2 from "~/assets/img/ripple-effect-bg2.svg?react";
import { Link, Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector, useLocation } from "~/libs/hooks/hooks.js";

import {
	ForgotPasswordForm,
	ResetPasswordForm,
	SignInForm,
	SignUpForm,
} from "./libs/components/components.js";
import { authRouteToHeader } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

const Auth: React.FC = () => {
	const { pathname } = useLocation();

	const { user } = useAppSelector(({ auth }) => ({
		user: auth.user,
	}));

	const getScreen = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.SIGN_IN: {
				return <SignInForm />;
			}

			case AppRoute.SIGN_UP: {
				return <SignUpForm />;
			}

			case AppRoute.FORGOT_PASSWORD: {
				return <ForgotPasswordForm />;
			}

			default: {
				return <ResetPasswordForm />;
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
						{authRouteToHeader[pathname]}
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
								<Link to={AppRoute.SIGN_IN}>Sign in</Link>
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
