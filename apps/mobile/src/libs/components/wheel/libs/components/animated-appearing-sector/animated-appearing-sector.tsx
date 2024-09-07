import { Animated, Circle } from "~/libs/components/components";
import { type SectorInitialSharedValues } from "~/libs/types/types";

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
	const initialSharedValues: SectorInitialSharedValues = {
		animatedInnerArrayDash: INITIAL_ANIMATED_VALUE,
		animatedInnerArrayGap: INITIAL_ANIMATED_VALUE,
		animatedInnerDashOffset: INITIAL_ANIMATED_VALUE,
		animatedInnerStrokeWidth: INITIAL_ANIMATED_VALUE,
		animatedOuterArrayDash: INITIAL_ANIMATED_VALUE,
		animatedOuterArrayGap: INITIAL_ANIMATED_VALUE,
		animatedOuterDashOffset: INITIAL_ANIMATED_VALUE,
		animatedOuterStrokeWidth: INITIAL_ANIMATED_VALUE,
		animatedRadius: INITIAL_ANIMATED_VALUE,
	};

	const { innerSectorAnimatedProperties, outerSectorAnimatedProperties } =
		useWheelAnimation({
			animationDuration: animationTime,
			animationRepetitions,
			initialSharedValues,
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
