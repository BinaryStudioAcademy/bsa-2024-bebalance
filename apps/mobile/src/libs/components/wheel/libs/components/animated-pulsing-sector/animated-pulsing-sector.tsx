import { Animated, Circle } from "~/libs/components/components";
import { useSharedValue } from "~/libs/hooks/hooks";

import { getRandomValue, getSectorParameters } from "../../helpers/helpers";
import { useWheelAnimation } from "../../hooks/hooks";

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

	const randomHeight = getRandomValue({
		max: maxHeight,
		min: maxHeight * HALF_VALUE_COEFFICIENT,
	});

	const { innerSectorAnimatedProperties, outerSectorAnimatedProperties } =
		useWheelAnimation({
			animationDuration: animationTime,
			animationRepetitions,
			sectorCalculationData: {
				centerGap,
				endPercentInner,
				endPercentOuter,
				height: randomHeight,
				layerOffset,
				startPercentInner,
				startPercentOuter,
			},
			sectorSharedValues: {
				animatedInnerArrayDash,
				animatedInnerArrayGap,
				animatedInnerDashOffset,
				animatedInnerStrokeWidth,
				animatedOuterArrayDash,
				animatedOuterArrayGap,
				animatedOuterDashOffset,
				animatedOuterStrokeWidth,
				animatedRadius,
			},
		});

	return (
		<>
			<AnimatedCircle
				animatedProps={outerSectorAnimatedProperties}
				cx={centerPoint}
				cy={centerPoint}
				fill="none"
				stroke={outlineColor}
			/>
			<AnimatedCircle
				animatedProps={innerSectorAnimatedProperties}
				cx={centerPoint}
				cy={centerPoint}
				fill="none"
				stroke={sectorColor}
			/>
		</>
	);
};

export { AnimatedPulsingSector };
