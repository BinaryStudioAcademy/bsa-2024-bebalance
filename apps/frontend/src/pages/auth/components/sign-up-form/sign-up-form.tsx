import { useEffect, useState } from "react";

import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";
import eyeIcon from "~/pages/auth/assets/icons/eye.svg";
import slashEyeIcon from "~/pages/auth/assets/icons/eye-slash.svg";

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

	type InputType = {
		icon: string;
		type: "password" | "text";
		value: string;
	};

	const [passwordData, setPasswordData] = useState<InputType>({
		icon: slashEyeIcon,
		type: "password",
		value: "",
	});

	const [confirmPasswordData, setConfirmPasswordData] = useState<InputType>({
		icon: slashEyeIcon,
		type: "password",
		value: "",
	});

	const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

	const handleInputChange = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			const { name, value } = event_.target as HTMLInputElement;
			if (name === "password") {
				setPasswordData({ ...passwordData, value });
			} else if (name === "confirmPassword") {
				setConfirmPasswordData({ ...confirmPasswordData, value });
			}
		},
		[passwordData, confirmPasswordData],
	);

	const toggleVisibilityPassword = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			event_.stopPropagation();
			const imgAttribute = (event_.target as HTMLImageElement).dataset["name"];
			if (imgAttribute == "password") {
				const newData: InputType =
					passwordData.icon === slashEyeIcon
						? { ...passwordData, icon: eyeIcon, type: "text" }
						: { ...passwordData, icon: slashEyeIcon, type: "password" };
				setPasswordData(newData);
			} else if (imgAttribute == "confirmPassword") {
				const newData: InputType =
					confirmPasswordData.icon === slashEyeIcon
						? { ...confirmPasswordData, icon: eyeIcon, type: "text" }
						: { ...confirmPasswordData, icon: slashEyeIcon, type: "password" };
				setConfirmPasswordData(newData);
			}
		},
		[passwordData, confirmPasswordData],
	);

	useEffect(() => {
		const passwordsMatch = passwordData.value === confirmPasswordData.value;
		setIsSubmitEnabled(passwordsMatch && passwordData.value !== "");
	}, [passwordData.value, confirmPasswordData.value]);

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
						inputChange={handleInputChange}
						label="Password"
						name="password"
						placeholder="password"
						type={passwordData.type}
					/>
					<Input
						className="input-container"
						clickIcon={toggleVisibilityPassword}
						control={control}
						errors={errors}
						hasIcon="true"
						iconSrc={confirmPasswordData.icon}
						inputChange={handleInputChange}
						label="Confirm password"
						name="confirmPassword"
						placeholder="confirm password"
						type={confirmPasswordData.type}
					/>
				</div>
				<Button
					className="btn btn-dark"
					isDisabled={!isSubmitEnabled}
					label="CREATE AN ACCOUNT"
					type="submit"
				/>
			</form>
		</>
	);
};

export { SignUpForm };
