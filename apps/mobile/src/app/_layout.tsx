import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import { StyleSheet } from 'react-native';

import { store } from '@app/store/store';

const RootLayout = () => {
	return (
		<GestureHandlerRootView style={styles.container}>
			<SafeAreaProvider initialMetrics={initialWindowMetrics}>
				<StoreProvider store={store}>
					<Stack screenOptions={{ headerShown: false }} />
				</StoreProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
};

export default RootLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
