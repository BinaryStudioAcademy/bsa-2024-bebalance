import { withTiming } from "react-native-reanimated";

import { useAnimatedProps, useEffect } from "~/libs/hooks/hooks";
import {
	type SectorParametersCalculationData,
	type SharedValue,
} from "~/libs/types/types";

import { getSectorParameters } from "../../helpers/helpers";

type SectorSharedValues = {
	animatedInnerArrayDash: SharedValue<number>;
	animatedInnerArrayGap: SharedValue<number>;
	animatedInnerDashOffset: SharedValue<number>;
	animatedInnerStrokeWidth: SharedValue<number>;
	animatedOuterArrayDash: SharedValue<number>;
	animatedOuterArrayGap: SharedValue<number>;
	animatedOuterDashOffset: SharedValue<number>;
	animatedOuterStrokeWidth: SharedValue<number>;
	animatedRadius: SharedValue<number>;
};

type WheelAnimationProperties = {
	animationDuration: number;
	animationRepetitions: number;
	sectorCalculationData: SectorParametersCalculationData;
	sectorSharedValues: SectorSharedValues;
};

type CircleAnimatedProperties = {
	r: number;
	strokeDasharray: number[];
	strokeDashoffset: number;
	strokeWidth: number;
};

type SectorAnimatedProperties = {
	innerSectorAnimatedProperties: CircleAnimatedProperties;
	outerSectorAnimatedProperties: CircleAnimatedProperties;
};

const useWheelAnimation = ({
	animationDuration,
	animationRepetitions,
	sectorCalculationData,
	sectorSharedValues,
}: WheelAnimationProperties): SectorAnimatedProperties => {
	const {
		animatedInnerArrayDash,
		animatedInnerArrayGap,
		animatedInnerDashOffset,
		animatedInnerStrokeWidth,
		animatedOuterArrayDash,
		animatedOuterArrayGap,
		animatedOuterDashOffset,
		animatedOuterStrokeWidth,
		animatedRadius,
	} = sectorSharedValues;

	const {
		centerGap,
		endPercentInner,
		endPercentOuter,
		height,
		layerOffset,
		startPercentInner,
		startPercentOuter,
	} = sectorCalculationData;

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

	const innerSectorAnimatedProperties = useAnimatedProps(() => ({
		r: withTiming(animatedRadius.value, timingSettings),
		strokeDasharray: [
			withTiming(animatedInnerArrayDash.value, timingSettings),
			withTiming(animatedInnerArrayGap.value, timingSettings),
		],
		strokeDashoffset: withTiming(animatedInnerDashOffset.value, timingSettings),
		strokeWidth: withTiming(animatedInnerStrokeWidth.value, timingSettings),
	})) as CircleAnimatedProperties;

	const outerSectorAnimatedProperties = useAnimatedProps(() => ({
		r: withTiming(animatedRadius.value, timingSettings),
		strokeDasharray: [
			withTiming(animatedOuterArrayDash.value, timingSettings),
			withTiming(animatedOuterArrayGap.value, timingSettings),
		],
		strokeDashoffset: withTiming(animatedOuterDashOffset.value, timingSettings),
		strokeWidth: withTiming(animatedOuterStrokeWidth.value, timingSettings),
	})) as CircleAnimatedProperties;

	return {
		innerSectorAnimatedProperties,
		outerSectorAnimatedProperties,
	};
};

export { useWheelAnimation };
