import React from "react";

import { ScreenWrapper, ScrollView, Text } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";
import { ScoresEditForm } from "~/screens/edit-wheel-results/components/scores-edit-form/scores-edit-form";

import { styles } from "./styles";

const handleSaveChanges = (): void => {
	//Todo: send data to backend
};

const EditWheelResults: React.FC = () => {
	return (
		<ScreenWrapper edges={["top", "left", "right"]}>
			<ScrollView style={[globalStyles.mh12, styles.container]}>
				<Text
					preset="subheading"
					style={[globalStyles.ph4, globalStyles.pv4]}
					weight="bold"
				>
					Edit My Wheel Results
				</Text>
				<ScoresEditForm handleSaveChanges={handleSaveChanges} />
			</ScrollView>
		</ScreenWrapper>
	);
};

export { EditWheelResults };
