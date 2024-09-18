import { NavigationContainer } from "@react-navigation/native";
import "fast-text-encoding";
import React, { type FC } from "react";
import BootSplash from "react-native-bootsplash";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StoreProvider } from "react-redux";

import { ToastMessage } from "~/libs/components/components";
import { RootScreenName } from "~/libs/enums/enums";
import { useCallback } from "~/libs/hooks/hooks";
import { store } from "~/libs/packages/store/store";
import { globalStyles } from "~/libs/styles/styles";
import { Root as RootNavigation } from "~/navigations/navigations";

const linking = {
	config: {
		screens: {
			[RootScreenName.FORGOT_PASSWORD]: "Forgot Password",
			[RootScreenName.RESET_PASSWORD]: "/reset-password",
			[RootScreenName.SIGN_IN]: "Sign In",
			[RootScreenName.SIGN_UP]: "Sign Up",
		},
	},
	prefixes: ["app://bebalance", "http://localhost:8081"],
};

const App: FC = () => {
	const handleNavigationReady = useCallback(() => {
		void BootSplash.hide({ fade: true });
	}, []);

	return (
		<StoreProvider store={store.instance}>
			<GestureHandlerRootView style={globalStyles.flex1}>
				<SafeAreaProvider>
					<NavigationContainer
						linking={linking}
						onReady={handleNavigationReady}
					>
						<RootNavigation />
						<ToastMessage />
					</NavigationContainer>
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</StoreProvider>
	);
};

export { App };
