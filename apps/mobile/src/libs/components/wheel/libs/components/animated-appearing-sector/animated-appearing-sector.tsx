import { Animated, Circle } from "~/libs/components/components";

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
	outlineColor: string;
	sectorColor: string;
	startPercentInner: number;
	startPercentOuter: number;
};

const INITIAL_ANIMATED_VALUE = 0;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedAppearingSector: React.FC<Properties> = ({
	animationRepetitions,
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
}: Properties) => {
	const animatedInnerArrayDash = INITIAL_ANIMATED_VALUE;
	const animatedInnerArrayGap = INITIAL_ANIMATED_VALUE;
	const animatedInnerDashOffset = INITIAL_ANIMATED_VALUE;
	const animatedInnerStrokeWidth = INITIAL_ANIMATED_VALUE;

	const animatedOuterArrayDash = INITIAL_ANIMATED_VALUE;
	const animatedOuterArrayGap = INITIAL_ANIMATED_VALUE;
	const animatedOuterDashOffset = INITIAL_ANIMATED_VALUE;
	const animatedOuterStrokeWidth = INITIAL_ANIMATED_VALUE;

	const animatedRadius = INITIAL_ANIMATED_VALUE;

	const { innerSectorAnimatedProperties, outerSectorAnimatedProperties } =
		useWheelAnimation({
			animationDuration: animationTime,
			animationRepetitions,
			initialSharedValues: {
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
			sectorCalculationData: {
				centerGap,
				endPercentInner,
				endPercentOuter,
				height,
				layerOffset,
				startPercentInner,
				startPercentOuter,
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

export { AnimatedAppearingSector };
