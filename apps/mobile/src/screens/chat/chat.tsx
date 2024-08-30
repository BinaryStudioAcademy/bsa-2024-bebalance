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

const Chat: React.FC = () => {
	const [physicalChecked, setPhysicalChecked] = useState<boolean>(false);
	const [workChecked, setWorkChecked] = useState<boolean>(false);

	const setCheckedMap: Record<
		string,
		React.Dispatch<React.SetStateAction<boolean>>
	> = {
		Physical: setPhysicalChecked,
		Work: setWorkChecked,
	};

	const handleCheckboxChange = (categoryName: string, value: boolean): void => {
		const setChecked = setCheckedMap[categoryName];

		if (setChecked) {
			setChecked(value);
		}
	};

	const handleChange = (categoryName: string): ((value: boolean) => void) => {
		return (value: boolean): void => {
			handleCheckboxChange(categoryName, value);
		};
	};

	return (
		<ScreenWrapper>
			<View style={[globalStyles.flex1, globalStyles.gap12, globalStyles.p12]}>
				{mockCategories.map((category) => {
					const isChecked =
						category.name === "Physical" ? physicalChecked : workChecked;

					return (
						<Checkbox
							isChecked={isChecked}
							key={category.id}
							label={category.name}
							onValueChange={handleChange(category.name)}
						/>
					);
				})}
			</View>
		</ScreenWrapper>
	);
};

export { Chat };
