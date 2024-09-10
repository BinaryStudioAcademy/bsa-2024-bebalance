import { Animated, Circle } from "~/libs/components/components";

import { INITIAL_SHARED_DATA } from "../../constants/constants";
import { useWheelAnimation } from "../../hooks/hooks";

type Properties = {
	animationDuration: number;
	animationRepetitions: number;
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

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedAppearingSector: React.FC<Properties> = ({
	animationDuration,
	animationRepetitions,
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
	const { innerSectorAnimatedProperties, outerSectorAnimatedProperties } =
		useWheelAnimation({
			animationDuration,
			animationRepetitions,
			initialSharedValues: INITIAL_SHARED_DATA,
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
