import React from "react";

import { Text, View } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

type Properties = {
	currentStep: number;
	totalSteps: number;
};

const Counter: React.FC<Properties> = ({ currentStep, totalSteps }) => {
	return (
		<View
			style={[
				globalStyles.ph16,
				globalStyles.pv4,
				globalStyles.flexDirectionRow,
				styles.container,
			]}
		>
			<Text style={styles.currentStep} weight="bold">
				{currentStep}
			</Text>
			<Text style={styles.divider} weight="bold">
				/
			</Text>
			<Text style={styles.totalSteps} weight="bold">
				{totalSteps}
			</Text>
		</View>
	);
};

export { Counter };
