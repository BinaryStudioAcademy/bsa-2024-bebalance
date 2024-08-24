import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_IN_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
		validationSchema: userSignInValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<section className={styles["signup-container"]}>
			<div className={styles["logo-container"]}>
				<div
					className={getValidClassNames(
						styles["circle"],
						styles["circle-pink"],
					)}
				/>
				<h1>LOGO</h1>
			</div>
			<h3 className={styles["title-form"]}>Sign In</h3>
			<span className={styles["auth-info"]}>
				No account? Go to
				<Link to={AppRoute.SIGN_UP}> Create an account</Link>
			</span>
			<form onSubmit={handleFormSubmit}>
				<div className={styles["input-groups"]}>
					<Input
						control={control}
						errors={errors}
						label="Email"
						name="email"
						placeholder="email"
						type="email"
					/>
					<Input
						control={control}
						errors={errors}
						label="Password"
						name="password"
						placeholder="password"
						type="password"
					/>
				</div>
				<div className={styles["footer-groups"]}>
					<Button label="SIGN IN" type="submit" variant="dark" />
					<Link to="/">Forgot password?</Link>
				</div>
			</form>
		</section>
	);
};

export { SignInForm };
