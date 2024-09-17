import React from "react";

import { Text, TouchableOpacity, View } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { useCallback } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./style";

type PageSwitcherProperties = {
	activeTab: string;
	onTabChange: (tab: string) => void;
	tabs: string[];
};

const PageSwitcher: React.FC<PageSwitcherProperties> = ({
	activeTab,
	onTabChange,
	tabs,
}) => {
	const handleTabPress = useCallback(
		(tab: string): void => {
			onTabChange(tab);
		},
		[onTabChange],
	);

	const handlePress = (tab: string): (() => void) => {
		return () => {
			handleTabPress(tab);
		};
	};

	const renderedTabs = tabs.map((tab) => {
		const isActive = activeTab === tab;

		return (
			<TouchableOpacity
				key={tab}
				onPress={handlePress(tab)}
				style={[
					globalStyles.alignItemsCenter,
					globalStyles.flex1,
					globalStyles.pv8,
					styles.tab,
					isActive ? styles.activeTab : styles.inactiveTab,
				]}
			>
				<Text
					preset="regular"
					style={{
						color: isActive ? BaseColor.BLACK : BaseColor.GRAY,
					}}
				>
					{tab}
				</Text>
			</TouchableOpacity>
		);
	});

	return (
		<View
			style={[
				globalStyles.flexDirectionRow,
				globalStyles.justifyContentSpaceBetween,
				globalStyles.p4,
				styles.container,
			]}
		>
			{renderedTabs}
		</View>
	);
};

export { PageSwitcher };
