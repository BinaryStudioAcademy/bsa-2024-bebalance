const getRadiansFromPercent = (percent: number): number => {
	const QUATER_PERCENT = 25;
	const WHOLE_CIRCLE_PERCENT = 100;
	const MAX_ANGLE = 360;
	const HALF_CIRCLE_ANGLE = 180;
	const mirroredPercent =
		(WHOLE_CIRCLE_PERCENT + QUATER_PERCENT - percent) % WHOLE_CIRCLE_PERCENT;
	const angle = (mirroredPercent * MAX_ANGLE) / WHOLE_CIRCLE_PERCENT;

	return (angle * Math.PI) / HALF_CIRCLE_ANGLE;
};

export { getRadiansFromPercent };
