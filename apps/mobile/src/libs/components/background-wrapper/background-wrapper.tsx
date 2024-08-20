import { ReactNode } from "react";
import { type ImageSourcePropType } from "react-native";

import { Image, View } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";

import { Planet } from "./libs/components/planet/planet";
import { styles } from "./styles";

const circleTop =
	require("~/assets/images/top-circle.png") as ImageSourcePropType;
const circleBottom =
	require("~/assets/images/bottom-circle.png") as ImageSourcePropType;

type Properties = {
	children: ReactNode;
};

const BackgroundWrapper = ({ children }: Properties) => {
	return (
		<View style={[styles.container, globalStyles.flex1]}>
			<Image source={circleTop} style={[styles.image, styles.topImage]} />
			<View style={[styles.dot, styles.dotPositionTop]} />
			<View style={[styles.dot, styles.dotPositionRight]} />
			<View style={[styles.dot, styles.dotPositionRightBottom]} />
			<View style={[styles.dot, styles.dotPositionBottom]} />
			<View style={[styles.dot, styles.dotPositionLeft]} />
			<Planet color={"green"} size={"sm"} style={styles.topPlanet} />
			<Planet
				color={"blue"}
				gradientDirection={"topToBottom"}
				size={"sm"}
				style={styles.leftPlanet}
			/>
			{children}
			<Planet
				color={"pink"}
				gradientDirection={"topToBottom"}
				size={"lg"}
				style={styles.bottomPlanet}
			/>
			<Image source={circleBottom} style={[styles.image, styles.bottomImage]} />
		</View>
	);
};

export { BackgroundWrapper };
