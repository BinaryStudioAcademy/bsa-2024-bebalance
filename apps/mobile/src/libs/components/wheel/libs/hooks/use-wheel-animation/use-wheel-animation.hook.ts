import { withTiming } from "react-native-reanimated";

import {
	useAnimatedProps,
	useEffect,
	useSharedValue,
} from "~/libs/hooks/hooks";
import {
	type SectorInitialSharedValues,
	type SectorParametersCalculationData,
} from "~/libs/types/types";

import { getSectorParameters } from "../../helpers/helpers";

type WheelAnimationProperties = {
	animationDuration: number;
	animationRepetitions: number;
	initialSharedValues: SectorInitialSharedValues;
	sectorCalculationData: SectorParametersCalculationData;
};

type CircleAnimatedProperties = {
	r: number;
	strokeDasharray: number[];
	strokeDashoffset: number;
	strokeWidth: number;
};

type SectorAnimatedProperties = {
	innerSectorAnimatedProperties: Partial<CircleAnimatedProperties>;
	outerSectorAnimatedProperties: Partial<CircleAnimatedProperties>;
};

const useWheelAnimation = ({
	animationDuration,
	animationRepetitions,
	initialSharedValues,
	sectorCalculationData,
}: WheelAnimationProperties): SectorAnimatedProperties => {
	const {
		centerGap,
		endPercentInner,
		endPercentOuter,
		height,
		layerOffset,
		startPercentInner,
		startPercentOuter,
	} = sectorCalculationData;

	const animatedInnerArrayDash = useSharedValue(
		initialSharedValues.animatedInnerArrayDash,
	);
	const animatedInnerArrayGap = useSharedValue(
		initialSharedValues.animatedInnerArrayGap,
	);
	const animatedInnerDashOffset = useSharedValue(
		initialSharedValues.animatedInnerDashOffset,
	);
	const animatedInnerStrokeWidth = useSharedValue(
		initialSharedValues.animatedInnerStrokeWidth,
	);
	const animatedOuterArrayDash = useSharedValue(
		initialSharedValues.animatedOuterArrayDash,
	);
	const animatedOuterArrayGap = useSharedValue(
		initialSharedValues.animatedOuterArrayGap,
	);
	const animatedOuterDashOffset = useSharedValue(
		initialSharedValues.animatedOuterDashOffset,
	);
	const animatedOuterStrokeWidth = useSharedValue(
		initialSharedValues.animatedOuterStrokeWidth,
	);
	const animatedRadius = useSharedValue(initialSharedValues.animatedRadius);

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
		layerOffset,
		startPercentInner,
		startPercentOuter,
	]);

	const timingSettings = { duration: animationDuration };

	const innerSectorAnimatedProperties: Partial<CircleAnimatedProperties> =
		useAnimatedProps(() => ({
			r: withTiming(animatedRadius.value, timingSettings),
			strokeDasharray: [
				withTiming(animatedInnerArrayDash.value, timingSettings),
				withTiming(animatedInnerArrayGap.value, timingSettings),
			],
			strokeDashoffset: withTiming(
				animatedInnerDashOffset.value,
				timingSettings,
			),
			strokeWidth: withTiming(animatedInnerStrokeWidth.value, timingSettings),
		}));

	const outerSectorAnimatedProperties: Partial<CircleAnimatedProperties> =
		useAnimatedProps(() => ({
			r: withTiming(animatedRadius.value, timingSettings),
			strokeDasharray: [
				withTiming(animatedOuterArrayDash.value, timingSettings),
				withTiming(animatedOuterArrayGap.value, timingSettings),
			],
			strokeDashoffset: withTiming(
				animatedOuterDashOffset.value,
				timingSettings,
			),
			strokeWidth: withTiming(animatedOuterStrokeWidth.value, timingSettings),
		}));

	return {
		innerSectorAnimatedProperties,
		outerSectorAnimatedProperties,
	};
};

export { useWheelAnimation };
