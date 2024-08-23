import rippleEffectBg from "~/assets/img/ripple-effect-bg.svg";
import rippleEffectBg2 from "~/assets/img/ripple-effect-bg2.svg";
import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
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
		<div className={styles["container"]}>
			<div className={styles["form-container"]}>
				<form className={styles["form"]} onSubmit={handleFormSubmit}>
					<div className={styles["form-header"]}>
						<div className={styles["form-header__logo-container"]}>
							<div className={styles["form-header__logo"]} />
							<span className={styles["form-header__logo-text"]}>logo</span>
						</div>

						<h1 className={styles["form-header__text"]}>sign in</h1>
						<span className={styles["form-header__sub-text"]}>
							No account? Go to{" "}
							<Link to={AppRoute.SIGN_UP}>Create an account</Link>
						</span>
					</div>

					<Input
						control={control}
						errors={errors}
						label="Email"
						name="email"
						placeholder="name@gmail.com"
						type="email"
					/>

					<Input
						control={control}
						errors={errors}
						label="Password"
						name="password"
						placeholder="*******"
						type="text"
					/>

					<Button label="SIGN IN" type="submit" variant="dark" />
				</form>
			</div>

			<div className={styles["logo-container"]}>
				<span className={styles["logo"]}>logo</span>
			</div>

			<img
				alt="ripple-effect-bg"
				className={styles["ripple-effect__background1"]}
				src={rippleEffectBg}
			/>
			<img
				alt="ripple-effect-bg"
				className={styles["ripple-effect__background2"]}
				src={rippleEffectBg2}
			/>

			<div className={styles["circle-gradient1"]} />
			<div className={styles["circle-gradient2"]} />
			<div className={styles["circle-gradient3"]} />
			<div className={styles["circle-gradient4"]} />
		</div>
	);
};

export { SignInForm };
