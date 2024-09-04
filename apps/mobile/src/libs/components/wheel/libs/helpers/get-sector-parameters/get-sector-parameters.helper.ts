type GetSectorParametersArguments = {
	centerGap: number;
	endPercentInner: number;
	endPercentOuter: number;
	height: number;
	layerOffset: number;
	startPercentInner: number;
	startPercentOuter: number;
};

const QUATER_PERCENT = 25;
const TWO = 2;
const MAX_PERCENT = 100;

const getSectorParameters = ({
	centerGap,
	endPercentInner,
	endPercentOuter,
	height,
	layerOffset,
	startPercentInner,
	startPercentOuter,
}: GetSectorParametersArguments): {
	innerDashArrayDash: number;
	innerDashArrayGap: number;
	innerDashOffset: number;
	innerStrokeWidth: number;
	outerDashArrayDash: number;
	outerDashArrayGap: number;
	outerDashOffset: number;
	outerStrokeWidth: number;
	radius: number;
} => {
	const outerStrokeWidth = height - centerGap;
	const innerStrokeWidth = height - layerOffset * TWO - centerGap;
	const radius = (height + centerGap) / TWO;
	const circumference = Math.round(radius * TWO * Math.PI);
	const innerDashArrayDash =
		((endPercentInner - startPercentInner) * circumference) / MAX_PERCENT;
	const outerDashArrayDash =
		((endPercentOuter - startPercentOuter) * circumference) / MAX_PERCENT;
	const innerDashArrayGap = circumference - innerDashArrayDash;
	const outerDashArrayGap = circumference - outerDashArrayDash;
	const innerDashOffset =
		((circumference * (MAX_PERCENT + QUATER_PERCENT - startPercentInner)) /
			MAX_PERCENT) %
		circumference;
	const outerDashOffset =
		((circumference * (MAX_PERCENT + QUATER_PERCENT - startPercentOuter)) /
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
