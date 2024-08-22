import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants.js";
import styles from "./style.module.css";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
		defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
		validationSchema: userSignUpValidationSchema,
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
			<h3 className={styles["title-form"]}>CREATE AN ACCOUNT</h3>
			<span className={styles["auth-info"]}>
				Already have an account? Go to
				<Link to={AppRoute.SIGN_IN}> Log in</Link>
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
						placeholder="password"
						type="password"
					/>
				</div>
				<Button label="CREATE AN ACCOUNT" type="submit" variant="dark" />
			</form>
		</section>
	);
};

export { SignUpForm };
