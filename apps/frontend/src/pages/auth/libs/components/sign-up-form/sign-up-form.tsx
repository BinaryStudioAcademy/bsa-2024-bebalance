import { Button, Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignUpFormDto,
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants.js";
import { CustomValidation } from "./libs/enums.js";
import styles from "./styles.module.css";

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
					setError(CustomValidation.FIELD, {
						message: CustomValidation.ERROR_MESSAGE,
						type: CustomValidation.ERROR_TYPE,
					});
				}
			})(event_);
		},
		[handleSubmit, onSubmit, setError],
	);

	return (
		<>
			<form className={styles["form"]} onSubmit={handleFormSubmit}>
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
					placeholder="name@example.com"
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

				<Button label="CREATE AN ACCOUNT" type="submit" variant="dark" />
			</form>

			<div className={styles["circle-gradient1"]} />
			<div className={styles["circle-gradient2"]} />
			<div className={styles["circle-gradient3"]} />
			<div className={styles["circle-gradient4"]} />
		</>
	);
};

export { SignUpForm };
