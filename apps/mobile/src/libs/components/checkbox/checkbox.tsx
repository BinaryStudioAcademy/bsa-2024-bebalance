import LibraryCheckbox from "@react-native-community/checkbox";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

import { LinearGradient, Text, View } from "~/libs/components/components";
import { AngleGradient, BaseColor, GradientColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

type Properties = {
	hasVisuallyHiddenLabel?: boolean;
	isChecked: boolean;
	label: string;
	onValueChange: (newValue: boolean) => void;
	containerStyle?: StyleProp<ViewStyle>;
	checkboxStyle?: StyleProp<ViewStyle>;
};

const Checkbox: React.FC<Properties> = ({
	hasVisuallyHiddenLabel = false,
	isChecked,
	label,
	containerStyle,
	checkboxStyle,
	onValueChange,
}) => {
	const borderColors = isChecked
		? [...GradientColor.BLUE]
		: [BaseColor.LIGHT_GRAY, BaseColor.LIGHT_GRAY];

	return (
		<LinearGradient
			angle={AngleGradient.ANGLE}
			angleCenter={{
				x: AngleGradient.X_POINT,
				y: AngleGradient.Y_POINT,
			}}
			colors={borderColors}
			locations={[AngleGradient.FIRST_STOP, AngleGradient.SECOND_STOP]}
			style={[styles.gradientContainer, containerStyle]}
			useAngle
		>
			<View
				style={[
					globalStyles.alignItemsCenter,
					globalStyles.flexDirectionRow,
					globalStyles.pv2,
					styles.innerContainer,
					checkboxStyle,
				]}
			>
				<LibraryCheckbox
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
				/>
				<Text
					preset="subheading"
					style={hasVisuallyHiddenLabel && globalStyles.visuallyHidden}
					weight="bold"
				>
					{label}
				</Text>
			</View>
		</LinearGradient>
	);
};

export { Checkbox };
