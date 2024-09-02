import React from "react";

import { Circle, SvgText } from "~/libs/components/components";

import { LabelCoefficient } from "../../enums/label-coefficient.enum";
import { getCircumferencePointCoordinates } from "../../helpers/helpers";

type Properties = {
	centerPoint: number;
	circleColor: string;
	pointAngleRadians: number;
	score: number;
	text: string;
	wheelRadius: number;
};

const SVG_INITIAL_COORDINATE = 0;

const LabelOnCircle: React.FC<Properties> = ({
	centerPoint,
	circleColor,
	pointAngleRadians,
	score,
	text,
	wheelRadius,
}) => {
	const textVerticalShift = wheelRadius * LabelCoefficient.TEXT_SIZE;

	const { x: textX, y: textY } = getCircumferencePointCoordinates({
		circleX: centerPoint,
		circleY: centerPoint,
		pointAngleRadians,
		radius: wheelRadius * LabelCoefficient.POINT_LEVEL_RADIUS,
	});

	const { x: circleX, y: circleY } = getCircumferencePointCoordinates({
		circleX: centerPoint,
		circleY: centerPoint,
		pointAngleRadians,
		radius: wheelRadius * LabelCoefficient.CIRCLE_LEVEL_RADIUS,
	});

	return (
		<>
			<Circle
				cx={circleX}
				cy={circleY}
				fill={circleColor}
				r={wheelRadius * LabelCoefficient.CIRCLE_SIZE}
			/>
			<SvgText
				dx={textX}
				dy={textY}
				fill="#000"
				fontFamily="Nunito-Bold"
				fontSize={wheelRadius * LabelCoefficient.TEXT_SIZE}
				textAnchor="middle"
				x={SVG_INITIAL_COORDINATE}
				y={textVerticalShift}
			>
				{text}
			</SvgText>
			<SvgText
				dx={textX}
				dy={textY}
				fill="#000"
				fontFamily="Nunito-Bold"
				fontSize={wheelRadius * LabelCoefficient.SCORE_SIZE}
				textAnchor="middle"
				x={SVG_INITIAL_COORDINATE}
				y={SVG_INITIAL_COORDINATE}
			>
				{score}
			</SvgText>
		</>
	);
};

export { LabelOnCircle };
