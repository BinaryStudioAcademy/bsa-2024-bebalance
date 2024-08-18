import eyeIcon from "~/assets/icons/eye.png";
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
						name="email"
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
						control={control}
						errors={errors}
						hasIcon="true"
						iconSrc={eyeIcon}
						label="Password"
						name="password"
						placeholder="password"
						type="text"
					/>
					<Input
						className="input-container"
						control={control}
						errors={errors}
						hasIcon="true"
						iconSrc={eyeIcon}
						label="Confirm password"
						name="password"
						placeholder="password"
						type="text"
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
