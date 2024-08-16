import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { useAppDispatch, useAppSelector } from '@app/hooks/hooks';
import type { SignInRequestDto } from '@app/types/types';
import { selectIsAuthenticated, signIn } from '@app/store/auth/auth-slice';

import { ScreenWrapper } from '@app/components/components';

const SignInScreen = () => {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(state => selectIsAuthenticated(state));

	const [user, setUser] = useState<SignInRequestDto>({
		login: '',
		password: '',
	});

	const handleSignIn = () => {
		if (!user.login || !user.password) {
			return;
		}

		dispatch(signIn(user));
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.navigate('/(tabs)/home');
		}
	}, [isAuthenticated]);

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<Text>Sign In</Text>
				<TextInput
					placeholder="Email"
					style={styles.input}
					autoCapitalize="none"
					onChangeText={text => setUser(prev => ({ ...prev, login: text }))}
				/>
				<TextInput
					placeholder="Password"
					style={styles.input}
					autoCapitalize="none"
					secureTextEntry={true}
					onChangeText={text => setUser(prev => ({ ...prev, password: text }))}
				/>
				<Text style={styles.button} onPress={handleSignIn}>
					Sign In
				</Text>
			</View>
		</ScreenWrapper>
	);
};

export default SignInScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		height: 40,
		width: '80%',
		padding: 10,
		margin: 12,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 5,
	},
	button: {
		marginTop: 20,
	},
});
