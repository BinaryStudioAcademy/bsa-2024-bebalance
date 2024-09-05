import { withTiming } from "react-native-reanimated";

import { Animated, Circle } from "~/libs/components/components";
import {
	useAnimatedProps,
	useEffect,
	useSharedValue,
} from "~/libs/hooks/hooks";

import { getRandomValue, getSectorParameters } from "../../helpers/helpers";

type Properties = {
	animationRepetitions: number;
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

const HALF_VALUE_COEFFICIENT = 0.5;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedPulsingSector: React.FC<Properties> = ({
	animationRepetitions,
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
}: Properties) => {
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

	useEffect(() => {
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
	}, [
		animationRepetitions,
		animatedInnerArrayGap,
		animatedInnerDashOffset,
		animatedInnerArrayDash,
		animatedInnerStrokeWidth,
		animatedOuterArrayDash,
		animatedOuterArrayGap,
		animatedOuterDashOffset,
		animatedOuterStrokeWidth,
		animatedRadius,
		centerGap,
		endPercentInner,
		endPercentOuter,
		height,
		maxHeight,
		layerOffset,
		startPercentInner,
		startPercentOuter,
	]);

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
				stroke={outlineColor}
			/>
			<AnimatedCircle
				animatedProps={animatedInnerSectorProperties}
				cx={centerPoint}
				cy={centerPoint}
				fill="none"
				stroke={sectorColor}
			/>
		</>
	);
};

export { AnimatedPulsingSector };
