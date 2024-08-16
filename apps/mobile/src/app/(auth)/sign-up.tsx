import { useEffect, useState } from "react";
import { router } from "expo-router";

import { useAppDispatch, useAppSelector } from "~/app/hooks/hooks";
import type { SignUpRequestDto } from "~/app/types/types";
import { selectIsAuthenticated, signUp } from "~/app/store/auth/auth-slice";

import {
	StyleSheet,
	Text,
	TextInput,
	View,
	ScreenWrapper,
} from "~/app/components/components";

const SignUpScreen = () => {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector((state) =>
		selectIsAuthenticated(state),
	);

	const [user, setUser] = useState<SignUpRequestDto>({
		login: "",
		password: "",
	});

	const handleSignUp = () => {
		if (!user.login || !user.password) {
			return;
		}

		dispatch(signUp(user));
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.navigate("/(tabs)/home");
		}
	}, [isAuthenticated]);

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<TextInput
					placeholder="Email"
					style={styles.input}
					autoCapitalize="none"
					onChangeText={(text) => setUser((prev) => ({ ...prev, login: text }))}
				/>
				<TextInput
					placeholder="Password"
					style={styles.input}
					autoCapitalize="none"
					secureTextEntry={true}
					onChangeText={(text) =>
						setUser((prev) => ({ ...prev, password: text }))
					}
				/>
				<Text style={styles.button} onPress={handleSignUp}>
					Sign Up
				</Text>
			</View>
		</ScreenWrapper>
	);
};

export default SignUpScreen;

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
