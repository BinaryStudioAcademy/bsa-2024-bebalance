import { NavigationContainer } from "@react-navigation/native";
import "fast-text-encoding";
import React, { type FC } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StoreProvider } from "react-redux";

import { ToastMessage } from "~/libs/components/components";
import { store } from "~/libs/packages/store/store";
import { globalStyles } from "~/libs/styles/styles";
import { Root as RootNavigation } from "~/navigations/navigations";

const App: FC = () => {
	return (
		<StoreProvider store={store.instance}>
			<GestureHandlerRootView style={globalStyles.flex1}>
				<SafeAreaProvider>
					<NavigationContainer>
						<RootNavigation />
						<ToastMessage />
					</NavigationContainer>
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</StoreProvider>
	);
};

export { App };
