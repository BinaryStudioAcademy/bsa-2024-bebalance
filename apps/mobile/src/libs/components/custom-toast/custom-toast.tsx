import React from "react";
import { type ToastData } from "react-native-toast-message";

import { Icon, Text, View } from "~/libs/components/components";
import { BaseColor, ToastMessageType } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";
import { type ValueOf } from "~/libs/types/types";

import {
	getToastColorSchemeByType,
	getToastIconNameByType,
} from "./libs/helpers/helpers";
import { styles } from "./styles";

type Properties = {
	type: ValueOf<typeof ToastMessageType>;
} & ToastData;

const ICON_SIZE = 24;

const CustomToast: React.FC<Properties> = ({
	text1,
	text2,
	type = ToastMessageType.INFO,
}) => {
	const colorScheme = getToastColorSchemeByType(type);
	const iconName = getToastIconNameByType(type);

	return (
		<View
			style={[
				globalStyles.flex1,
				globalStyles.flexDirectionRow,
				globalStyles.alignItemsCenter,
				globalStyles.justifyContentSpaceBetween,
				globalStyles.gap24,
				globalStyles.boxShadow,
				styles.container,
			]}
		>
			<View
				style={[
					styles.typeIndicator,
					{ backgroundColor: colorScheme.secondaryColor },
				]}
			/>
			<View
				style={[
					globalStyles.flex1,
					globalStyles.flexDirectionRow,
					globalStyles.alignItemsCenter,
					globalStyles.gap24,
				]}
			>
				<View
					style={[
						globalStyles.alignItemsCenter,
						globalStyles.justifyContentCenter,
						styles.iconWrapper,
						{ backgroundColor: colorScheme.secondaryColor },
					]}
				>
					<Icon
						color={colorScheme.primaryColor}
						name={iconName}
						size={ICON_SIZE}
					/>
				</View>
				<View style={globalStyles.flex1}>
					<Text color={colorScheme.primaryColor} size="md" weight="bold">
						{text1}
					</Text>
					<Text color={BaseColor.DARK_GRAY} preset="regular">
						{text2}
					</Text>
				</View>
			</View>
		</View>
	);
};

export { CustomToast };
