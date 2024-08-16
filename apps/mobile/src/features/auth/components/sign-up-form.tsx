import { useEffect } from "react";
import { router } from "expo-router";
import { Controller } from "react-hook-form";

import { StyleSheet, Text, TextInput, View } from "~/app/components/components";
import { useAppForm } from "~/app/hooks/use-app-form.hook";
import { useAppDispatch, useAppSelector } from "~/app/hooks/store";
import type { UserSignUpRequestDto } from "~/app/types/types";
import { signUp } from "~/app/store/auth/auth-slice";

import { userSignUpValidationSchema } from "../validation/validation";

const SignUpForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector((state) => Boolean(state.auth.user));

	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validationSchema: userSignUpValidationSchema,
	});

	const onSubmit = (payload: UserSignUpRequestDto) => {
		dispatch(signUp(payload));
	};

	const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
		void handleSubmit(onSubmit)(event_);
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/(tabs)/home");
		}
	}, [isAuthenticated]);

	return (
		<View style={styles.container}>
			<Controller
				control={control}
				render={({ field: { onChange, value } }) => (
					<TextInput
						style={styles.input}
						onChangeText={(value) => onChange(value)}
						value={value}
						autoCapitalize="none"
						placeholder="Enter your email"
					/>
				)}
				name="email"
				rules={{ required: true }}
			/>
			<Text> {errors.email?.message} </Text>
			<Controller
				control={control}
				render={({ field: { onChange, value } }) => (
					<TextInput
						style={styles.input}
						secureTextEntry={true}
						autoCapitalize="none"
						onChangeText={(value) => onChange(value)}
						value={value}
						placeholder="Enter your password"
					/>
				)}
				name="password"
				rules={{ required: true }}
			/>
			<Text> {errors.password?.message} </Text>
			<Text style={styles.button} onPress={handleFormSubmit}>
				Sign Up
			</Text>
		</View>
	);
};

export { SignUpForm };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		height: 40,
		width: "80%",
		padding: 10,
		margin: 12,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 5,
	},
	button: {
		marginTop: 20,
	},
});
