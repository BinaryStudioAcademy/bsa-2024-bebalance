import React, { useCallback } from "react";
import { StyleSheet } from "react-native";

import { Text, TouchableOpacity, View } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";

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
				style={[styles.tab, isActive ? styles.activeTab : styles.inactiveTab]}
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

	return <View style={styles.container}>{renderedTabs}</View>;
};

const styles = StyleSheet.create({
	activeTab: {
		backgroundColor: BaseColor.BG_WHITE,
	},
	container: {
		backgroundColor: BaseColor.EXTRA_LIGHT_GRAY,
		borderRadius: 30,
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 5,
	},
	inactiveTab: {
		backgroundColor: "transparent",
	},
	tab: {
		alignItems: "center",
		borderRadius: 30,
		flex: 1,
		paddingVertical: 5,
	},
});

export { PageSwitcher };
