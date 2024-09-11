import React from "react";

import { Image, Planet, View } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";
import { type ImageSourcePropType } from "~/libs/types/types";

import { presetToPlanetPositionMap } from "./libs/maps/maps";
import { styles } from "./styles";

type Properties = {
	children: React.ReactNode;
	planetLayout?: keyof typeof presetToPlanetPositionMap;
};

const BackgroundWrapper: React.FC<Properties> = ({
	children,
	planetLayout = "default",
}: Properties) => {
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
			{presetToPlanetPositionMap[planetLayout].map((properties, index) => (
				<Planet key={index} {...properties} />
			))}

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
