import { useCallback } from "react";
import { type UserSignInRequestDto } from "shared";

import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppDispatch } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import { SignInForm } from "../auth/components/sign-in-form2/sign-in-form2.js";
import styles from "./styles.module.css";

const NotFound: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleSignInSubmit = useCallback(
		(payload: UserSignInRequestDto): void => {
			void dispatch(authActions.signIn(payload));
		},
		[dispatch],
	);

	return (
		<div className={styles["pageContainer"]}>
			<h1 className={styles["title"]}>404 - Page Not Found</h1>
			<p className={styles["text"]}>
				The page you are looking for does not exist.
			</p>
			<SignInForm onSubmit={handleSignInSubmit} />
			<Link to={AppRoute.ROOT} type="button">
				Go to Homepage
			</Link>
		</div>
	);
};

export { NotFound };
