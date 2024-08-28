import React from "react";

import {
	Checkbox,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { useState } from "~/libs/hooks/hooks";
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

const Chat: React.FC = () => {
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

	const handleCheckbox = (
		categoryName: string,
	): ((newValue: boolean) => void) => {
		return (newValue: boolean): void => {
			handleCheckboxChange(categoryName.toLowerCase(), newValue);
		};
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
						onValueChange={handleCheckbox(category.name)}
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

export { Chat };
