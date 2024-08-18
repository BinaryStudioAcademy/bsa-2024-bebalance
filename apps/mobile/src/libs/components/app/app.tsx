import { NavigationContainer } from "@react-navigation/native";
import "fast-text-encoding";
import React, { type FC } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as StoreProvider } from "react-redux";

import { store } from "~/libs/packages/store/store";
import { Root as RootNavigation } from "~/navigations/navigations";
import { globalStyles } from "~/styles/styles";

const App: FC = () => {
	return (
		<StoreProvider store={store.instance}>
			<GestureHandlerRootView style={globalStyles.flex1}>
				<NavigationContainer>
					<RootNavigation />
				</NavigationContainer>
			</GestureHandlerRootView>
		</StoreProvider>
	);
};

export { App };
