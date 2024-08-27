import React from "react";

import {
	CustomCheckbox,
	LinearGradient,
	Text,
	View,
} from "~/libs/components/components";
import { BaseColor, GradientColor, GradientPoints } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/global-styles/global-styles";

import { styles } from "./styles";

type Properties = {
	isChecked: boolean;
	label?: string;
	name?: string;
	onValueChange: (newValue: boolean) => void;
	restProperties?: Record<string, unknown>;
};

const Checkbox: React.FC<Properties> = ({
	isChecked,
	label,
	onValueChange,
	...restProperties
}) => {
	const borderColors = isChecked
		? [...GradientColor.BLUE]
		: [BaseColor.LIGHT_GRAY, BaseColor.LIGHT_GRAY];

	return (
		<LinearGradient
			angle={GradientPoints.GRADIENT_ANGLE}
			angleCenter={{
				x: GradientPoints.ANGLE_CENTER_POINT,
				y: GradientPoints.ANGLE_CENTER_POINT,
			}}
			colors={borderColors}
			locations={[
				GradientPoints.FIRST_COLOR_STOP,
				GradientPoints.SECOND_COLOR_STOP,
			]}
			style={styles.gradientContainer}
			useAngle
		>
			<View
				style={[
					globalStyles.alignItemsCenter,
					globalStyles.flexDirectionRow,
					globalStyles.pv8,
					styles.innerContainer,
				]}
			>
				<CustomCheckbox
					onCheckColor={BaseColor.BG_WHITE}
					onFillColor={BaseColor.CHECKBOX_BLUE}
					onTintColor={BaseColor.CHECKBOX_BLUE}
					onValueChange={onValueChange}
					style={globalStyles.mr8}
					tintColors={{
						false: BaseColor.LIGHT_GRAY,
						true: BaseColor.CHECKBOX_BLUE,
					}}
					value={isChecked}
					{...restProperties}
				/>
				{label && (
					<Text preset="subheading" weight="bold">
						{label}
					</Text>
				)}
			</View>
		</LinearGradient>
	);
};

export { Checkbox };
