import React, { useState } from "react";
import { RadioGroup as RNRadioGroup } from "react-native-radio-buttons-group";

import { Text } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";
import { type RadioButtonProps, type ViewStyle } from "~/libs/types/types";

import { DefaultStyles } from "./libs/constants/constants";
import { styles } from "./styles";

type RadioGroupItemStyle = {
	circleBorderColorActive?: string;
	circleBorderSize?: number;
	circleBorderSizeActive?: number;
	circleColorActive?: string;
	circleSize?: number;
} & ViewStyle;

type RadioGroupItem = {
	label: string;
	value: string;
};

type Properties = {
	itemContainerStyle?: RadioGroupItemStyle;
	onChange?: (value: RadioGroupItem) => void;
	options: RadioGroupItem[];
};

const RadioGroup: React.FC<Properties> = ({
	itemContainerStyle = {},
	onChange,
	options,
}: Properties) => {
	const {
		circleBorderColorActive = BaseColor.BG_BLUE,
		circleBorderSize = DefaultStyles.DEFAULT_BORDER_SIZE,
		circleBorderSizeActive = DefaultStyles.DEFAULT_ACTIVE_BORDER_SIZE,
		circleColorActive = BaseColor.BG_WHITE,
		circleSize = DefaultStyles.DEFAULT_CIRCLE_SIZE,
	} = itemContainerStyle;

	const [selectedId, setSelectedId] = useState<string>("");

	const radioButtonsProperties: RadioButtonProps[] = [];
	const itemsMap = new Map<string, RadioGroupItem>();

	for (const [index, option] of options.entries()) {
		const radioGroupItemID = index.toString();
		const radioButtonProperty = {
			containerStyle: [styles.commonItemContainer, itemContainerStyle],
			id: radioGroupItemID,
			label: (
				<Text
					preset="default"
					size="md"
					style={globalStyles.ml8}
					weight="semiBold"
				>
					{option.label}
				</Text>
			),
			size: circleSize,
			value: option.value,
		} as RadioButtonProps;

		const isActive = radioButtonProperty.id === selectedId;

		if (isActive) {
			radioButtonProperty.borderColor = circleBorderColorActive;
			radioButtonProperty.borderSize = circleBorderSizeActive;
			radioButtonProperty.color = circleColorActive;
		} else {
			radioButtonProperty.borderSize = circleBorderSize;
		}

		radioButtonsProperties.push(radioButtonProperty);
		itemsMap.set(radioGroupItemID, option);
	}

	const onChangeHandler = (id: string): void => {
		const chosenOption = itemsMap.get(id);

		if (onChange && chosenOption) {
			onChange(chosenOption);
		}

		setSelectedId(id);
	};

	return (
		<RNRadioGroup
			containerStyle={globalStyles.m16}
			onPress={onChangeHandler}
			radioButtons={radioButtonsProperties}
			selectedId={selectedId}
		/>
	);
};

export { RadioGroup };
