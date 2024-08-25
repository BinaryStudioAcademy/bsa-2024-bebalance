import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignUpFormDto,
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants.js";
import { ConfirmPassword } from "./libs/enums.js";
import styles from "./style.module.css";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit, setError } =
		useAppForm<UserSignUpFormDto>({
			defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
			validationSchema: userSignUpValidationSchema,
		});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((payload: UserSignUpFormDto) => {
				const { confirmPassword, ...userData } = payload;
				if (confirmPassword === userData.password) {
					onSubmit(userData);
				} else {
					setError(ConfirmPassword.KEY, {
						message: ConfirmPassword.error.MESSAGE,
						type: ConfirmPassword.error.TYPE,
					});
				}
			})(event_);
		},
		[handleSubmit, onSubmit, setError],
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
			<h3 className={styles["title-form"]}>CREATE AN ACCOUNT</h3>
			<span className={styles["auth-info"]}>
				Already have an account? Go to
				<Link to={AppRoute.SIGN_IN}> Sign in</Link>
			</span>
			<form onSubmit={handleFormSubmit}>
				<div className={styles["input-groups"]}>
					<Input
						control={control}
						errors={errors}
						label="Name"
						name="name"
						placeholder="name"
						type="text"
					/>
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
						placeholder="*******"
						type="password"
					/>
					<Input
						control={control}
						errors={errors}
						label="Confirm password"
						name="confirmPassword"
						placeholder="*******"
						type="password"
					/>
				</div>
				<Button label="CREATE AN ACCOUNT" type="submit" variant="dark" />
			</form>
		</section>
	);
};

export { SignUpForm };
