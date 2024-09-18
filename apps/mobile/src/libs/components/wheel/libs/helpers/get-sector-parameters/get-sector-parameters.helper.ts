import {
	type SectorParameters,
	type SectorParametersCalculationData,
} from "~/libs/types/types";

const QUARTER_PERCENT = 25;
const SCALING_FACTOR = 2;
const MAX_PERCENT = 100;

const getSectorParameters = ({
	centerGap,
	endPercentInner,
	endPercentOuter,
	height,
	layerOffset,
	startPercentInner,
	startPercentOuter,
}: SectorParametersCalculationData): SectorParameters => {
	const outerStrokeWidth = height + layerOffset * SCALING_FACTOR - centerGap;
	const innerStrokeWidth = height - layerOffset * SCALING_FACTOR - centerGap;
	const radius = (height + centerGap) / SCALING_FACTOR;
	const circumference = Math.round(radius * SCALING_FACTOR * Math.PI);
	const innerDashArrayDash =
		((endPercentInner - startPercentInner) * circumference) / MAX_PERCENT;
	const outerDashArrayDash =
		((endPercentOuter - startPercentOuter) * circumference) / MAX_PERCENT;
	const innerDashArrayGap = circumference - innerDashArrayDash;
	const outerDashArrayGap = circumference - outerDashArrayDash;
	const innerDashOffset =
		((circumference * (MAX_PERCENT + QUARTER_PERCENT - startPercentInner)) /
			MAX_PERCENT) %
		circumference;
	const outerDashOffset =
		((circumference * (MAX_PERCENT + QUARTER_PERCENT - startPercentOuter)) /
			MAX_PERCENT) %
		circumference;

	return {
		innerDashArrayDash,
		innerDashArrayGap,
		innerDashOffset,
		innerStrokeWidth,
		outerDashArrayDash,
		outerDashArrayGap,
		outerDashOffset,
		outerStrokeWidth,
		radius,
	};
};

export { getSectorParameters };
