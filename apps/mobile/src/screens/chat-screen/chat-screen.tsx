import React, { useState } from "react";

import {
	Checkbox,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";

const mockCategories = [
	{
		id: 1,
		name: "Physical",
	},
	{
		id: 2,
		name: "Work",
	},
];

type FormData = Record<string, boolean>;

const ChatScreen: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		physical: false,
		work: false,
	});

	const handleCheckboxChange = (name: string, value: boolean): void => {
		setFormData((previousData) => ({
			...previousData,
			[name]: value,
		}));
	};

	const FIRST_CHAR_INDEX = 0;
	const SECOND_CHAR_INDEX = 1;

	return (
		<ScreenWrapper>
			<View style={[globalStyles.flex1, globalStyles.gap12, globalStyles.p12]}>
				{mockCategories.map((category) => (
					<Checkbox
						isChecked={formData[category.name.toLowerCase()] || false}
						key={category.id}
						label={category.name}
						name={category.name.toLowerCase()}
						onValueChange={(newValue) => {
							handleCheckboxChange(category.name.toLowerCase(), newValue);
						}}
					/>
				))}

				<View style={globalStyles.mt16}>
					<Text>Submitted Data:</Text>
					{Object.entries(formData).map(([key, value]) => (
						<Text key={key}>
							{key.charAt(FIRST_CHAR_INDEX).toUpperCase() +
								key.slice(SECOND_CHAR_INDEX)}
							: {value ? "Yes" : "No"}
						</Text>
					))}
				</View>
			</View>
		</ScreenWrapper>
	);
};

export { ChatScreen };
