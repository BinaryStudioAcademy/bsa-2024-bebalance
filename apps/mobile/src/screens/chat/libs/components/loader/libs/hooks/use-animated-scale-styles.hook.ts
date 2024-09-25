import { type SharedValue, useAnimatedStyle } from "react-native-reanimated";

type ReturnValue = {
	transform: { scale: number }[];
};

const useAnimatedScaleStyle = (scaleValue: SharedValue<number>): ReturnValue =>
	useAnimatedStyle(() => ({
		transform: [{ scale: scaleValue.value }],
	}));

export { useAnimatedScaleStyle };
