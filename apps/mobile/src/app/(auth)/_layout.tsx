import { Stack } from 'expo-router';
import 'react-native-reanimated';

const UnauthorizedLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="sign-in" />
			<Stack.Screen name="sign-up" />
		</Stack>
	);
};

export default UnauthorizedLayout;
