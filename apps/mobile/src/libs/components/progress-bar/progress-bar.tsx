import { Dimensions } from "react-native";
import { default as RNProgressBar } from "react-native-progress-step-bar";

import { LinearGradient, View } from "~/libs/components/components";
import { GradientColor } from "~/libs/enums/enums";
import { useMemo } from "~/libs/hooks/hooks";

import { DEFAULT_WIDTH_VALUE } from "./constants/constants";
import { styles } from "./styles";

type Properties = {
	currentItemIndex: number;
	totalItemsAmount: number;
};

const ProgressBar: React.FC<Properties> = ({
	currentItemIndex,
	totalItemsAmount,
}) => {
	const { width: screenWidth } = Dimensions.get("window");

	const FilledBar = useMemo(
		() => (
			<LinearGradient
				colors={[...GradientColor.BLUE]}
				end={{ x: 1, y: 0 }}
				start={{ x: 0, y: 0 }}
				style={styles.bar}
			></LinearGradient>
		),
		[],
	);

	const Dot = useMemo(
		() => (
			<View style={styles.dotContainer}>
				<LinearGradient
					colors={[...GradientColor.BLUE]}
					end={{ x: 1, y: 0 }}
					start={{ x: 0, y: 0 }}
					style={styles.dotBorder}
				>
					<View style={styles.dotCenter}></View>
				</LinearGradient>
			</View>
		),
		[],
	);

	return (
		<View style={styles.container}>
			<RNProgressBar
				backgroundBarStyle={styles.backgroundBarStyle}
				backgroundDotStyle={styles.backgroundDotStyle}
				currentStep={currentItemIndex}
				CustomizableDot={Dot}
				CustomizedFilledBar={FilledBar}
				dotDiameter={12}
				filledBarStyle={styles.filledBarStyle}
				filledDotStyle={styles.filledDotStyle}
				height={2}
				steps={totalItemsAmount}
				stepToStepAnimationDuration={1000}
				width={screenWidth * DEFAULT_WIDTH_VALUE}
				withDots={true}
			/>
		</View>
	);
};

export { ProgressBar };
