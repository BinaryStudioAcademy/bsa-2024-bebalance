import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks.js";
import { NO_ERROR_INPUT_FIELD } from "~/modules/users/constants.js";
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
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const isInputError = Object.keys(errors).length > NO_ERROR_INPUT_FIELD;

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible((previousState) => !previousState);
	}, []);

	return (
		<>
			<form className={styles["form"]} onSubmit={handleFormSubmit}>
				<Input
					control={control}
					errors={errors}
					label="Email"
					name="email"
					placeholder="be@balance.com"
					type="email"
				/>

				<Input
					control={control}
					errors={errors}
					iconName={isPasswordVisible ? "crossedEye" : "eye"}
					label="Password"
					name="password"
					onIconClick={handleTogglePasswordVisibility}
					placeholder="••••••"
					type={isPasswordVisible ? "text" : "password"}
				/>

				<Button isDisabled={isInputError} label="SIGN IN" type="submit" />
			</form>

			<div className={styles["circle-gradient1"]} />
			<div className={styles["circle-gradient2"]} />
			<div className={styles["circle-gradient3"]} />
			<div className={styles["circle-gradient4"]} />
		</>
	);
};

export { SignInForm };
