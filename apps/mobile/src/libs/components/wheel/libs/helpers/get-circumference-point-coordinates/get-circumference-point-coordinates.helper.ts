type GetPointCoordinatesArguments = {
	circleX: number;
	circleY: number;
	pointAngleRadians: number;
	radius: number;
};

type PointCoordinates = {
	x: number;
	y: number;
};

const getCircumferencePointCoordinates = ({
	circleX,
	circleY,
	pointAngleRadians,
	radius,
}: GetPointCoordinatesArguments): PointCoordinates => {
	const x = circleX + radius * Math.cos(pointAngleRadians);
	const y = circleY - radius * Math.sin(pointAngleRadians);

	return { x, y };
};

export { getCircumferencePointCoordinates };
