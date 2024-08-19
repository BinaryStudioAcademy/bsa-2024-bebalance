import { useState } from "react";

import eyeIcon from "~/assets/icons/eye.svg";
import slashEyeIcon from "~/assets/icons/eye-slash.svg";
import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants.js";

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

	// const [showPassword, setShowPassword] = useState(false);
	// const [passwordIcon, setPasswordIcon] = useState(slashEyeIcon)
	// const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(slashEyeIcon)
	type InputType = {
		icon: string;
		type: "password" | "text";
	};

	const [passwordData, setPasswordData] = useState<InputType>({
		icon: slashEyeIcon,
		type: "password",
	});

	const [confirmPasswordData, setConfirmPasswordData] = useState<InputType>({
		icon: slashEyeIcon,
		type: "password",
	});

	const toggleVisibilityPassword = useCallback((): void => {
		const newData: InputType =
			passwordData.icon === slashEyeIcon
				? { icon: eyeIcon, type: "text" }
				: { icon: slashEyeIcon, type: "password" };
		setPasswordData(newData);
	}, [passwordData]);

	const toggleVisibilityConfirmPassword = useCallback((): void => {
		const newData: InputType =
			confirmPasswordData.icon === slashEyeIcon
				? { icon: eyeIcon, type: "text" }
				: { icon: slashEyeIcon, type: "password" };
		setConfirmPasswordData(newData);
	}, [confirmPasswordData]);

	return (
		<>
			<div className="logo-container">
				<div className="circle circle-pink"></div>
				<h1>LOGO</h1>
			</div>
			<h3 className="title-form">CREATE AN ACCOUNT</h3>
			<span className="auth-info">
				Already have an account? Go to
				<Link className="link-info" to={AppRoute.SIGN_IN}>
					{" "}
					Log in
				</Link>
			</span>
			<form onSubmit={handleFormSubmit}>
				<div className="input-groups">
					<Input
						className="input-container"
						control={control}
						errors={errors}
						label="Name"
						name="name"
						placeholder="name"
						type="text"
					/>
					<Input
						className="input-container"
						control={control}
						errors={errors}
						label="Email"
						name="email"
						placeholder="email"
						type="email"
					/>
					<Input
						className="input-container"
						clickIcon={toggleVisibilityPassword}
						control={control}
						errors={errors}
						hasIcon="true"
						iconSrc={passwordData.icon}
						label="Password"
						name="password"
						placeholder="password"
						type={passwordData.type}
					/>
					<Input
						className="input-container"
						clickIcon={toggleVisibilityConfirmPassword}
						control={control}
						errors={errors}
						hasIcon="true"
						iconSrc={confirmPasswordData.icon}
						label="Confirm password"
						name="confirmPassword"
						placeholder="confirm password"
						type={confirmPasswordData.type}
					/>
				</div>
				<Button
					className="btn btn-dark"
					label="CREATE AN ACCOUNT"
					type="submit"
				/>
			</form>
		</>
	);
};

export { SignUpForm };
