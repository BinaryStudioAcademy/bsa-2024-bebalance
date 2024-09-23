import React from "react";

import { Icon, Pressable, Text, View } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { useMemo } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

type Properties = {
	isDisabled?: boolean;
	label: string;
	onPress?: () => void;
	type: "complete" | "skip";
};

const ICON_SIZE = 15;

const TaskActionButton: React.FC<Properties> = ({
	isDisabled = false,
	label,
	onPress,
	type,
}) => {
	const { backgroundColor, iconName, typeColor } = useMemo(() => {
		return {
			backgroundColor:
				type === "skip" ? BaseColor.LIGHT_RED : BaseColor.LIGHT_GREEN,
			iconName: type === "skip" ? "close" : "check",
			typeColor: type === "skip" ? BaseColor.EXTRA_LIGHT_RED : BaseColor.GREEN,
		};
	}, [type]);

	return (
		<Pressable disabled={isDisabled} onPress={onPress}>
			{({ pressed }) => {
				const activeStyles = {
					backgroundColor: pressed ? backgroundColor : "transparent",
					borderColor: pressed ? typeColor : BaseColor.LIGHT_GRAY,
				};

				return (
					<View
						style={[
							globalStyles.ph8,
							globalStyles.alignItemsCenter,
							globalStyles.justifyContentCenter,
							globalStyles.flexDirectionRow,
							styles.container,
							activeStyles,
						]}
					>
						<Icon color={BaseColor.BLACK} name={iconName} size={ICON_SIZE} />
						<Text preset="regular" style={globalStyles.pl8} weight="semiBold">
							{label}
						</Text>
					</View>
				);
			}}
		</Pressable>
	);
};

export { TaskActionButton };
