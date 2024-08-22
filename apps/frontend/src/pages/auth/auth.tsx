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
import authIllustrationLeft from "~/pages/auth/assets/img/auth-illustration-left.svg";
import authIllustrationRight from "~/pages/auth/assets/img/auth-illustration-right.svg";

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
			<main className={styles["auth-container"]}>
				<section className={styles["form-container"]}>
					{getScreen(pathname)}
				</section>
				<section className={styles["ilustration-container"]}>
					<img
						alt="background"
						className={styles["img-left"]}
						src={authIllustrationLeft}
					/>
					<h1 className={styles["title"]}>Logo</h1>
					<img
						alt="background"
						className={styles["img-right"]}
						src={authIllustrationRight}
					/>
				</section>
			</main>
		</>
	);
};

export { Auth };
