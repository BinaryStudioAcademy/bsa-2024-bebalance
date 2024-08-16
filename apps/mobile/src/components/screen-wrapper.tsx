import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { useSafeAreaInsetsStyle } from '@app/hooks/hooks';

type ScreenWrapperProps = {
	safeAreaEdges?: Edge[];
	style?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	children?: React.ReactNode;
	statusBarProps?: React.ComponentProps<typeof StatusBar>;
};

const DEFAULT_SAFE_AREA_EDGES: Edge[] = ['top', 'bottom', 'left', 'right'];

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
	safeAreaEdges = DEFAULT_SAFE_AREA_EDGES,
	style,
	contentContainerStyle,
	children,
	statusBarProps,
}) => {
	const safeAreaStyles = useSafeAreaInsetsStyle(safeAreaEdges);

	return (
		<View style={[styles.outerContainer, safeAreaStyles, style]}>
			<StatusBar style="auto" animated={true} {...statusBarProps} />
			<View style={[styles.innerContainer, contentContainerStyle]}>
				{children}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		height: '100%',
		width: '100%',
	},
	innerContainer: {
		flex: 1,
	},
});

export { ScreenWrapper };
