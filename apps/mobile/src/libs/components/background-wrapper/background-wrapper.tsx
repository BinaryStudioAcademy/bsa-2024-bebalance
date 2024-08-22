import { ReactNode } from "react";

import { Image, View } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";
import { type ImageSourcePropType } from "~/libs/types/types";

import { Planet } from "./libs/components/planet/planet";
import { styles } from "./styles";

type Properties = {
	children: ReactNode;
};

const BackgroundWrapper = ({ children }: Properties) => {
	return (
		<View style={[globalStyles.flex1, styles.container]}>
			<Image
				source={
					require("~/assets/images/top-circle.png") as ImageSourcePropType
				}
				style={[styles.image, styles.topImage]}
			/>
			<View style={[styles.dot, styles.dotPositionTop]} />
			<View style={[styles.dot, styles.dotPositionRight]} />
			<View style={[styles.dot, styles.dotPositionRightBottom]} />
			<View style={[styles.dot, styles.dotPositionBottom]} />
			<View style={[styles.dot, styles.dotPositionLeft]} />
			<Planet color="green" size="sm" style={styles.topPlanet} />
			<Planet
				color="blue"
				gradientDirection="topToBottom"
				size="sm"
				style={styles.leftPlanet}
			/>

			<Planet
				color="pink"
				gradientDirection="topToBottom"
				size="lg"
				style={styles.bottomPlanet}
			/>
			<Image
				source={
					require("~/assets/images/bottom-circle.png") as ImageSourcePropType
				}
				style={[styles.image, styles.bottomImage]}
			/>
			<View style={[globalStyles.flex1, globalStyles.justifyContentCenter]}>
				{children}
			</View>
		</View>
	);
};

export { BackgroundWrapper };
