import { NavigationContainer } from "@react-navigation/native";
import "fast-text-encoding";
import React, { type FC } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as StoreProvider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { store } from "~/libs/packages/store/store";
import { Root as RootNavigation } from "~/navigations/navigations";

import { styles } from "./styles";

const App: FC = () => {
	return (
		<StoreProvider store={store.instance}>
			<GestureHandlerRootView style={styles.root}>
				<SafeAreaProvider>
					<NavigationContainer>
						<RootNavigation />
					</NavigationContainer>
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</StoreProvider>
	);
};

export { App };
