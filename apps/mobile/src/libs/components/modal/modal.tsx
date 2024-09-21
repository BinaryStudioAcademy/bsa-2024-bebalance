import { type FC } from "react";
import { Modal as RNModal } from "react-native";

import { TouchableOpacity, View } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";
import { type StyleProp, type ViewStyle } from "~/libs/types/types";

import { styles } from "./styles";

type Properties = {
	children: React.ReactNode;
	containerStyle?: StyleProp<ViewStyle>;
	isVisible: boolean;
	onBackdropPress?: () => void;
};

const Modal: FC<Properties> = ({
	children,
	containerStyle,
	isVisible,
	onBackdropPress,
}) => {
	return (
		<RNModal transparent visible={isVisible}>
			<View
				style={[
					globalStyles.flex1,
					globalStyles.justifyContentCenter,
					globalStyles.alignItemsCenter,
				]}
			>
				<TouchableOpacity
					activeOpacity={1}
					onPress={onBackdropPress}
					style={styles.backdrop}
				/>
				<View
					style={[
						globalStyles.justifyContentCenter,
						styles.container,
						containerStyle,
					]}
				>
					{children}
				</View>
			</View>
		</RNModal>
	);
};

export { Modal };
