import LibraryCheckbox, {
	type CheckBoxProps,
} from "@react-native-community/checkbox";
import React from "react";

import { LinearGradient, Text, View } from "~/libs/components/components";
import { AngleGradient, BaseColor, GradientColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/global-styles/global-styles";

import { styles } from "./styles";

type Properties = {
	hasVisuallyHiddenLabel?: boolean;
	isChecked: boolean;
	label: string;
	restProperties?: Record<string, unknown>;
} & CheckBoxProps;

const Checkbox: React.FC<Properties> = ({
	hasVisuallyHiddenLabel = false,
	isChecked,
	label,
	...restProperties
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
				<LibraryCheckbox
					onCheckColor={BaseColor.BG_WHITE}
					onFillColor={BaseColor.CHECKBOX_BLUE}
					onTintColor={BaseColor.CHECKBOX_BLUE}
					style={globalStyles.mr8}
					tintColors={{
						false: BaseColor.LIGHT_GRAY,
						true: BaseColor.CHECKBOX_BLUE,
					}}
					value={isChecked}
					{...restProperties}
				/>
				{!hasVisuallyHiddenLabel && (
					<Text preset="subheading" weight="bold">
						{label}
					</Text>
				)}
			</View>
		</LinearGradient>
	);
};

export { Checkbox };
