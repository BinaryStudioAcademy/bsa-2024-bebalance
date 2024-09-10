import React from "react";

import {
	Button,
	SliderContent,
	Text,
	View,
} from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";
import { type SliderData } from "~/libs/types/types";

import { styles } from "./styles";

type Properties = {
	handleSaveChanges: () => void;
};

const mockData: SliderData[] = [
	{ color: "yellow", initValue: 3, label: "Physical" },
	{ color: "lime", initValue: 6, label: "Work" },
	{ color: "violet", initValue: 6, label: "Friends" },
	{ color: "red", initValue: 6, label: "Love" },
	{ color: "green", initValue: 6, label: "Money" },
	{ color: "pink", initValue: 6, label: "Free time" },
	{ color: "orange", initValue: 6, label: "Spiritual" },
	{ color: "blue", initValue: 6, label: "Mental" },
];

const ScoresEditForm: React.FC<Properties> = ({ handleSaveChanges }) => {
	return (
		<View
			style={[
				globalStyles.flex1,
				globalStyles.justifyContentCenter,
				globalStyles.pv16,
				styles.form,
			]}
		>
			<View style={[globalStyles.flex1, globalStyles.alignItemsCenter]}>
				<Text weight="bold">Do you feel any changes in anything?</Text>
				<Text weight="bold">Estimate the fields from 1 to 10</Text>
			</View>
			{mockData.map((item) => (
				<SliderContent
					color={item.color}
					initValue={item.initValue}
					key={item.label}
					label={item.label}
				/>
			))}
			<View style={[globalStyles.mh32, globalStyles.pt24]}>
				<Button label="SAVE CHANGES" onPress={handleSaveChanges} />
			</View>
		</View>
	);
};

export { ScoresEditForm };
