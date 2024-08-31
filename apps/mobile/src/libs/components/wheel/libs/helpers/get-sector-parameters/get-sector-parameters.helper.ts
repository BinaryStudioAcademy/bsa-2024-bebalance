type GetSectorParametersArguments = {
	endPercent: number;
	height: number;
	holeSize: number;
	layerOffset: number;
	startPercent: number;
};

const getSectorParameters = ({
	endPercent,
	height,
	holeSize,
	layerOffset,
	startPercent,
}: GetSectorParametersArguments): {
	dashArrayDash: number;
	dashArrayGap: number;
	dashOffset: number;
	radius: number;
	strokeWidth: number;
} => {
	const QUATER_PERCENT = 25;
	const TWO = 2;
	const MAX_PERCENT = 100;

	const strokeWidth = height - layerOffset * TWO - holeSize;
	const radius = (height + holeSize) / TWO;
	const circumference = radius * TWO * Math.PI;
	const dashArrayDash =
		((endPercent - startPercent) * circumference) / MAX_PERCENT;
	const dashArrayGap = circumference - dashArrayDash;
	const dashOffset =
		((circumference * (MAX_PERCENT + QUATER_PERCENT - startPercent)) /
			MAX_PERCENT) %
		circumference;

	return { dashArrayDash, dashArrayGap, dashOffset, radius, strokeWidth };
};

export { getSectorParameters };
