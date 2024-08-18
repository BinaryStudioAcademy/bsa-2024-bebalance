import authIlustrationLeft from "~/assets/img/auth-ilustration-left.svg";
import authIlustrationRight from "~/assets/img/auth-ilustration-right.svg";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	// useAppSelector,
	useCallback,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { type UserSignUpRequestDto } from "~/modules/users/users.js";

import { SignInForm, SignUpForm } from "./components/components.js";

const Auth: React.FC = () => {
	const dispatch = useAppDispatch();
	// const { dataStatus } = useAppSelector(({ auth }) => ({
	// 	dataStatus: auth.dataStatus,
	// }));
	const { pathname } = useLocation();

	const handleSignInSubmit = useCallback((): void => {
		// handle sign in
	}, []);

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
			{/* state: {dataStatus} */}
			<main className="auth-container">
				<section className="form-container ">{getScreen(pathname)}</section>
				<section className="ilustration-container ">
					<img
						alt="sky blue ilustation"
						className="img-left"
						src={authIlustrationLeft}
					/>
					<h1 className="title">Logo</h1>
					<img
						alt="sky blue ilustation"
						className="img-right"
						src={authIlustrationRight}
					/>
				</section>
			</main>
		</>
	);
};

export { Auth };
