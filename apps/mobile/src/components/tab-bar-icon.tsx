import type { FC, ComponentProps } from "react";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { IconProps } from "@expo/vector-icons/build/createIconSet";

type TabBarIconProps = IconProps<ComponentProps<typeof Ionicons>["name"]>;

const TabBarIcon: FC<TabBarIconProps> = ({ style, ...rest }) => {
	return <Ionicons size={28} style={[styles.icon, style]} {...rest} />;
};

export { TabBarIcon };

const styles = StyleSheet.create({
	icon: {
		marginBottom: -3,
	},
});
