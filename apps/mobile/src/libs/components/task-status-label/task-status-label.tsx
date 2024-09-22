import React from "react";

import { Icon, Text, View } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

type Properties = {
	label: string;
	type: "complete" | "skip";
};

const ICON_SIZE = 15;

const TaskStatusLabel: React.FC<Properties> = ({ label, type }) => {
	const { backgroundColor, iconName, typeColor } = {
		backgroundColor:
			type === "skip" ? BaseColor.LIGHT_RED : BaseColor.LIGHT_GREEN,
		iconName: type === "skip" ? "close" : "check",
		typeColor: type === "skip" ? BaseColor.EXTRA_LIGHT_RED : BaseColor.GREEN,
	};

	return (
		<View
			style={[
				globalStyles.ph8,
				globalStyles.alignItemsCenter,
				globalStyles.justifyContentCenter,
				globalStyles.flexDirectionRow,
				styles.container,
				{ backgroundColor, borderColor: typeColor },
			]}
		>
			<Icon color={BaseColor.BLACK} name={iconName} size={ICON_SIZE} />
			<Text preset="regular" style={globalStyles.pl8} weight="semiBold">
				{label}
			</Text>
		</View>
	);
};

export { TaskStatusLabel };
