type GetWheelSectorParametersArguments = {
	endPercent: number;
	height: number;
	layerOffset: number;
	spaceCoefficient: number;
	startPercent: number;
};

const getWheelSectorParameters = ({
	endPercent,
	height,
	layerOffset,
	spaceCoefficient,
	startPercent,
}: GetWheelSectorParametersArguments): {
	dashArrayDash: number;
	dashArrayGap: number;
	dashOffset: number;
	radius: number;
	strokeWidth: number;
} => {
	const DASH_OFFSET_CORRECTION = 0.25;
	const TWO = 2;

	const radius = (height + spaceCoefficient) / TWO;
	const circumference = radius * TWO * Math.PI;
	const sectorOffsetPercent = layerOffset / circumference;
	const dashArrayDash =
		(endPercent - startPercent - sectorOffsetPercent) * circumference;
	const dashArrayGap = circumference - dashArrayDash;
	const dashOffset =
		(DASH_OFFSET_CORRECTION - startPercent - sectorOffsetPercent / TWO) *
		circumference;
	const strokeWidth = height - layerOffset * TWO - spaceCoefficient;

	return { dashArrayDash, dashArrayGap, dashOffset, radius, strokeWidth };
};

export { getWheelSectorParameters };
