import { View } from "~/libs/components/components";
import { type StyleProp, type ViewStyle } from "~/libs/types/types";

import { styles } from "./styles";

type Properties = {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
};

const ChatBox: React.FC<Properties> = ({ children, style }: Properties) => {
	return <View style={[styles.container, style]}>{children}</View>;
};

export { ChatBox };
