import { Button, Input } from "~/libs/components/components.js";
import { NumericalValue } from "~/libs/enums/enums.js";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks.js";
import {
	type UserSignUpFormDto,
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants/constants.js";
import { ConfirmPasswordCustomValidation } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, getValues, handleSubmit, setError } =
		useAppForm<UserSignUpFormDto>({
			defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
			validationSchema: userSignUpValidationSchema,
		});
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState<boolean>(false);
	const isInputError = Object.keys(errors).length > NumericalValue.ZERO;

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((payload: UserSignUpRequestDto) => {
				const { confirmPassword } = getValues();
				const { password } = payload;

				if (confirmPassword === password) {
					onSubmit(payload);
				} else {
					setError(ConfirmPasswordCustomValidation.FIELD, {
						message: ConfirmPasswordCustomValidation.ERROR_MESSAGE,
						type: ConfirmPasswordCustomValidation.ERROR_TYPE,
					});
				}
			})(event_);
		},
		[onSubmit, handleSubmit, setError, getValues],
	);

	const handleTogglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible((previousState) => !previousState);
	}, []);

	const handleToggleConfirmPasswordVisibility = useCallback(() => {
		setIsConfirmPasswordVisible((previousState) => !previousState);
	}, []);

	return (
		<>
			<form className={styles["form"]} noValidate onSubmit={handleFormSubmit}>
				<Input
					control={control}
					errors={errors}
					label="Name"
					name="name"
					placeholder="Name"
					type="text"
				/>

				<Input
					control={control}
					errors={errors}
					label="Email"
					name="email"
					placeholder="email@example.com"
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

				<Input
					control={control}
					errors={errors}
					iconName={isConfirmPasswordVisible ? "crossedEye" : "eye"}
					label="Confirm password"
					name="confirmPassword"
					onIconClick={handleToggleConfirmPasswordVisibility}
					placeholder="••••••"
					type={isConfirmPasswordVisible ? "text" : "password"}
				/>

				<Button
					isDisabled={isInputError}
					label="CREATE AN ACCOUNT"
					type="submit"
				/>
			</form>

			<div className={styles["circle-gradient1"]} />
			<div className={styles["circle-gradient2"]} />
			<div className={styles["circle-gradient3"]} />
			<div className={styles["circle-gradient4"]} />
		</>
	);
};

export { SignUpForm };
