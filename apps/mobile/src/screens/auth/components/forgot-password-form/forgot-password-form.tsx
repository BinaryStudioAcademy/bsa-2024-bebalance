import { Button, Input, Link, Text } from "~/libs/components/components";
import { BaseColor, RootScreenName } from "~/libs/enums/enums";
import { useAppForm, useCallback } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type EmailDto,
	userForgotPasswordValidationSchema,
} from "~/packages/users/users";

import { FORGOT_PASSWORD_DEFAULT_VALUES } from "./libs/constants";

type Properties = {
	onSubmit: (payload: EmailDto) => void;
};

const ForgotPasswordForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<EmailDto>({
		defaultValues: FORGOT_PASSWORD_DEFAULT_VALUES,
		validationSchema: userForgotPasswordValidationSchema,
	});

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(onSubmit)();
	}, [handleSubmit, onSubmit]);

	return (
		<>
			<Text preset="uppercase" size="xl" weight="bold">
				FORGOT PASSWORD
			</Text>
			{/* <Text style={globalStyles.mb16} weight="semiBold">
				Enter your email address and we will send you a link to reset your password.
			</Text> */}
			<Text style={globalStyles.mb16} weight="semiBold">
				Already have an account? Go to{" "}
				<Link
					color={BaseColor.BLUE}
					label="Sign in"
					to={`/${RootScreenName.SIGN_IN}`}
					weight="semiBold"
				/>
			</Text>
			<Input
				control={control}
				errors={errors}
				label="Email"
				name="email"
				placeholder="name@example.com"
			/>
			<Button label="RESET PASSWORD" onPress={handleFormSubmit} />
		</>
	);
};

export { ForgotPasswordForm };
