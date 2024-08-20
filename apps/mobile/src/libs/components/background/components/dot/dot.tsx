import { type StyleProp, type TextStyle, View } from "react-native";

import { styles } from "./styles";

type Properties = {
	position: StyleProp<TextStyle>;
};

const Dot = ({ position }: Properties) => {
	return <View style={[styles.dot, position]} />;
};

export { Dot };
