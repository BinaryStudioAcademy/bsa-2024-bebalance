import { withTiming } from "react-native-reanimated";

import { Animated, Circle } from "~/libs/components/components";
import {
	useAnimatedProps,
	useEffect,
	useSharedValue,
} from "~/libs/hooks/hooks";

import { getRandomValue, getSectorParameters } from "../../helpers/helpers";

type Properties = {
	animationTime: number;
	centerGap: number;
	centerPoint: number;
	endPercentInner: number;
	endPercentOuter: number;
	height: number;
	layerOffset: number;
	maxHeight: number;
	outlineColor: string;
	sectorColor: string;
	startPercentInner: number;
	startPercentOuter: number;
};

const INITIAL_ANIMATED_VALUE = 0;
const HALF_VALUE_COEFFICIENT = 0.5;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedPulsingSector: React.FC<Properties> = ({
	animationTime,
	centerGap,
	centerPoint,
	endPercentInner,
	endPercentOuter,
	height,
	layerOffset,
	maxHeight,
	outlineColor,
	sectorColor,
	startPercentInner,
	startPercentOuter,
}) => {
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

	const animatedInnerArrayDash = useSharedValue(innerDashArrayDash);
	const animatedInnerArrayGap = useSharedValue(innerDashArrayGap);
	const animatedInnerDashOffset = useSharedValue(innerDashOffset);
	const animatedInnerStrokeWidth = useSharedValue(innerStrokeWidth);

	const animatedOuterArrayDash = useSharedValue(outerDashArrayDash);
	const animatedOuterArrayGap = useSharedValue(outerDashArrayGap);
	const animatedOuterDashOffset = useSharedValue(outerDashOffset);
	const animatedOuterStrokeWidth = useSharedValue(outerStrokeWidth);

	const animatedRadius = useSharedValue(radius);
	const timingSettings = { duration: animationTime };

	const updateSectorAnimatedParameters = (): void => {
		const nextHeight = getRandomValue({
			max: maxHeight,
			min: maxHeight * HALF_VALUE_COEFFICIENT,
		});
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
			height: nextHeight,
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
	};

	useEffect(() => {
		updateSectorAnimatedParameters();

		const interval = setInterval(() => {
			updateSectorAnimatedParameters();
		}, animationTime);

		return (): void => {
			clearInterval(interval);
		};
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

export { AnimatedPulsingSector };
