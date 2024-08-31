import React from "react";
import { getCircumferencePointCoordinates } from "shared";

import { Circle, SvgText } from "~/libs/components/components";

import { LabelCoefficient } from "../../enums/label-coefficient.enum";

type Properties = {
	centerPoint: number;
	circleColor: string;
	pointAngleRadians: number;
	score: number;
	text: string;
	wheelRadius: number;
};

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
				x={0}
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
				x={0}
				y={0}
			>
				{score}
			</SvgText>
		</>
	);
};

export { LabelOnCircle };
