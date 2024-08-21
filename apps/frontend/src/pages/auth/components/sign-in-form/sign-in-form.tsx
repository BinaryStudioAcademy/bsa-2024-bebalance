import eye from "~/assets/img/eye.svg";
import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_IN_PAYLOAD } from "./libs/constants.js";
import rippleEffectBg from "./libs/images/ripple-effect-bg.svg";
import rippleEffectBg2 from "./libs/images/ripple-effect-bg2.svg";
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
		<div className={styles["sign-in__container"]}>
			<div className={styles["sign-in__form-container"]}>
				<form className={styles["sign-in__form"]} onSubmit={handleFormSubmit}>
					<div className={styles["sign-in__form-header"]}>
						<div className={styles["sign-in__form-header-logo-container"]}>
							<div className={styles["sign-in__form-header-logo"]} />
							<span className={styles["sign-in__form-header-logo-text"]}>
								LOGO
							</span>
						</div>

						<h1 className={styles["sign-in__form-header-text"]}>SIGN IN</h1>
						<span className={styles["sign-in__form-header-sub-text"]}>
							No account? Go to{" "}
							<Link to={AppRoute.SIGN_UP} type="navLink">
								Create an Account
							</Link>
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
						icon={eye}
						iconPosition="right"
						label="Password"
						name="password"
						placeholder="*******"
						type="text"
					/>

					<Button label="SIGN IN" type="submit" />
				</form>
			</div>

			<div className={styles["sign-in__logo-container"]}>
				<span className={styles["sign-in__logo"]}>LOGO</span>
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
		</div>
	);
};

export { SignInForm };
