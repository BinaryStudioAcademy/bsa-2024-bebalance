import { Animated, Circle } from "~/libs/components/components";

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

	const initialSharedValues = {
		animatedInnerArrayDash: innerDashArrayDash,
		animatedInnerArrayGap: innerDashArrayGap,
		animatedInnerDashOffset: innerDashOffset,
		animatedInnerStrokeWidth: innerStrokeWidth,
		animatedOuterArrayDash: outerDashArrayDash,
		animatedOuterArrayGap: outerDashArrayGap,
		animatedOuterDashOffset: outerDashOffset,
		animatedOuterStrokeWidth: outerStrokeWidth,
		animatedRadius: radius,
	};

	const randomHeight = getRandomValue({
		max: maxHeight,
		min: maxHeight * HALF_VALUE_COEFFICIENT,
	});

	const { innerSectorAnimatedProperties, outerSectorAnimatedProperties } =
		useWheelAnimation({
			animationDuration: animationTime,
			animationRepetitions,
			initialSharedValues,
			sectorCalculationData: {
				centerGap,
				endPercentInner,
				endPercentOuter,
				height: randomHeight,
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

export { AnimatedPulsingSector };
