import { type SharedValue, useAnimatedStyle } from "react-native-reanimated";

type Property = {
	transform: { scale: number }[];
};

const getAnimatedStyle = (scaleValue: SharedValue<number>): Property =>
	useAnimatedStyle(() => ({
		transform: [{ scale: scaleValue.value }],
	}));

export { getAnimatedStyle };
