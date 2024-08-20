import {
	Image,
	ImageSourcePropType,
	type ImageStyle,
	type StyleProp,
} from "react-native";

import { styles } from "./styles";

const circles =
	require("../../../../../assets/images/circles.png") as ImageSourcePropType;

type Properties = {
	position: StyleProp<ImageStyle>;
};

const BackgroundImage = ({ position }: Properties) => {
	return <Image source={circles} style={[styles.image, position]} />;
};

export { BackgroundImage };
