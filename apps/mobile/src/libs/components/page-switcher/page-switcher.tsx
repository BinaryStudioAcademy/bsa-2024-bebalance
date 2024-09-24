import React from "react";

import { Text, TouchableOpacity, View } from "~/libs/components/components";
import { useCallback } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type StyleProp, type ViewStyle } from "~/libs/types/types";

import { styles } from "./style";

type PageSwitcherProperties = {
	activeTab: string;
	onTabChange: (tab: string) => void;
	style?: StyleProp<ViewStyle>;
	tabs: string[];
};

const PageSwitcher: React.FC<PageSwitcherProperties> = ({
	activeTab,
	onTabChange,
	style,
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

	const handleRenderTabs = tabs.map((tab) => {
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
					style={isActive ? styles.active : styles.inactive}
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
				style,
			]}
		>
			{handleRenderTabs}
		</View>
	);
};

export { PageSwitcher };
