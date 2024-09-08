import { Animated, Circle } from "~/libs/components/components";
import { type SectorInitialSharedValues } from "~/libs/types/types";

import { MINIFY_TWICE_COEFFICIENT } from "../../constants/constants";
import {
	getSectorParameters,
	getSectorRandomValue,
} from "../../helpers/helpers";
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
	maxHeight: number;
	outlineColor: string;
	sectorColor: string;
	startPercentInner: number;
	startPercentOuter: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedPulsingSector: React.FC<Properties> = ({
	animationDuration,
	animationRepetitions,
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

	const initialSharedValues: SectorInitialSharedValues = {
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

	const randomHeight = getSectorRandomValue({
		max: maxHeight,
		min: maxHeight * MINIFY_TWICE_COEFFICIENT,
	});

	const { innerSectorAnimatedProperties, outerSectorAnimatedProperties } =
		useWheelAnimation({
			animationDuration,
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
