import React from "react";

import { Checkbox, ScreenWrapper, View } from "~/libs/components/components";
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
			</View>
		</ScreenWrapper>
	);
};

export { Chat };
