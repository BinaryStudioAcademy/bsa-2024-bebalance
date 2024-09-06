import { Animated, Circle } from "~/libs/components/components";
import { useSharedValue } from "~/libs/hooks/hooks";

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
	const animatedInnerArrayDash = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedInnerArrayGap = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedInnerDashOffset = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedInnerStrokeWidth = useSharedValue(INITIAL_ANIMATED_VALUE);

	const animatedOuterArrayDash = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedOuterArrayGap = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedOuterDashOffset = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedOuterStrokeWidth = useSharedValue(INITIAL_ANIMATED_VALUE);

	const animatedRadius = useSharedValue(INITIAL_ANIMATED_VALUE);

	const { innerSectorAnimatedProperties, outerSectorAnimatedProperties } =
		useWheelAnimation({
			animationDuration: animationTime,
			animationRepetitions,
			sectorCalculationData: {
				centerGap,
				endPercentInner,
				endPercentOuter,
				height,
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

export { AnimatedAppearingSector };
