import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useCallback,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import { SignInForm, SignUpForm } from "./components/components.js";
import styles from "./style.module.css";

const Auth: React.FC = () => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();

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

	const getScreen = (screen: string): React.ReactNode => {
		switch (screen) {
			case AppRoute.SIGN_IN: {
				return <SignInForm onSubmit={handleSignInSubmit} />;
			}

			case AppRoute.SIGN_UP: {
				return <SignUpForm onSubmit={handleSignUpSubmit} />;
			}
		}

		return null;
	};

	return (
		<>
			<div className={styles["auth-container"]}>
				<div className={styles["form-container"]}>
					<div className={styles["form-header"]}>
						<div className={styles["form-header__logo-container"]}>
							<div className={styles["form-header__logo"]} />
							<span className={styles["form-header__logo-text"]}>logo</span>
						</div>

						<h1 className={styles["form-header__text"]}>
							{pathname === AppRoute.SIGN_IN ? "sign in" : "sign up"}
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
		</>
	);
};

export { Auth };
