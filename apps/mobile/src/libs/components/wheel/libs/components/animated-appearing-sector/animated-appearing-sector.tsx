import { withTiming } from "react-native-reanimated";

import { Animated, Circle } from "~/libs/components/components";
import {
	useAnimatedProps,
	useEffect,
	useSharedValue,
} from "~/libs/hooks/hooks";

import { getSectorParameters } from "../../helpers/helpers";

const INITIAL_ANIMATED_VALUE = 0;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Properties = {
	animationTime: number;
	centerGap: number;
	centerPoint: number;
	endPercentInner: number;
	endPercentOuter: number;
	height: number;
	layerOffset: number;
	outlineColor: string;
	sectorColor: string;
	startPercentInner: number;
	startPercentOuter: number;
};

const AnimatedAppearingSector: React.FC<Properties> = ({
	animationTime,
	centerGap,
	centerPoint,
	endPercentInner,
	endPercentOuter,
	height,
	layerOffset,
	outlineColor,
	sectorColor,
	startPercentInner,
	startPercentOuter,
}) => {
	const animatedInnerArrayDash = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedInnerArrayGap = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedInnerDashOffset = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedInnerStrokeWidth = useSharedValue(INITIAL_ANIMATED_VALUE);

	const animatedOuterArrayDash = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedOuterArrayGap = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedOuterDashOffset = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedOuterStrokeWidth = useSharedValue(INITIAL_ANIMATED_VALUE);

	const animatedRadius = useSharedValue(INITIAL_ANIMATED_VALUE);
	const timingSettings = { duration: animationTime };

	useEffect(() => {
		const {
			innerDashArrayDash,
			innerDashArrayGap,
			innerDashOffset,
			innerStrokeWidth,
			outerDashArrayDash,
			outerDashArrayGap,
			outerDashOffset,
			outerStrokeWidth,
			radius,
		} = getSectorParameters({
			centerGap,
			endPercentInner,
			endPercentOuter,
			height,
			layerOffset,
			startPercentInner,
			startPercentOuter,
		});

		animatedInnerArrayGap.value = innerDashArrayGap;
		animatedInnerArrayDash.value = innerDashArrayDash;
		animatedInnerDashOffset.value = innerDashOffset;
		animatedInnerStrokeWidth.value = innerStrokeWidth;

		animatedOuterArrayGap.value = outerDashArrayGap;
		animatedOuterArrayDash.value = outerDashArrayDash;
		animatedOuterDashOffset.value = outerDashOffset;
		animatedOuterStrokeWidth.value = outerStrokeWidth;

		animatedRadius.value = radius;
	}, []);

	const animatedInnerSectorProperties = useAnimatedProps(() => ({
		r: withTiming(animatedRadius.value, timingSettings),
		strokeDasharray: [
			withTiming(animatedInnerArrayDash.value, timingSettings),
			withTiming(animatedInnerArrayGap.value, timingSettings),
		],
		strokeDashoffset: withTiming(animatedInnerDashOffset.value, timingSettings),
		strokeWidth: withTiming(animatedInnerStrokeWidth.value, timingSettings),
	}));

	const animatedOuterSectorProperties = useAnimatedProps(() => ({
		r: withTiming(animatedRadius.value, timingSettings),
		strokeDasharray: [
			withTiming(animatedOuterArrayDash.value, timingSettings),
			withTiming(animatedOuterArrayGap.value, timingSettings),
		],
		strokeDashoffset: withTiming(animatedOuterDashOffset.value, timingSettings),
		strokeWidth: withTiming(animatedOuterStrokeWidth.value, timingSettings),
	}));

	return (
		<>
			<AnimatedCircle
				animatedProps={animatedOuterSectorProperties}
				cx={centerPoint}
				cy={centerPoint}
				fill="none"
				origin={[INITIAL_ANIMATED_VALUE, INITIAL_ANIMATED_VALUE]}
				stroke={outlineColor}
			/>
			<AnimatedCircle
				animatedProps={animatedInnerSectorProperties}
				cx={centerPoint}
				cy={centerPoint}
				fill="none"
				origin={[INITIAL_ANIMATED_VALUE, INITIAL_ANIMATED_VALUE]}
				stroke={sectorColor}
			/>
		</>
	);
};

export { AnimatedAppearingSector };
