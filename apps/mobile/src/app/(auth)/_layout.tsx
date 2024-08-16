import { Stack } from "expo-router";
import "react-native-reanimated";

import { RouteName } from "~/app/enums/enums";

const UnauthorizedLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name={RouteName.SIGN_UP} />
		</Stack>
	);
};

export default UnauthorizedLayout;
