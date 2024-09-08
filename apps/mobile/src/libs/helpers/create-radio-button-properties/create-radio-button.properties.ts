import { BaseColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";
import {
	type RadioButtonProps,
	type RadioGroupItemStyle,
	type RadioGroupOption,
	type StyleProp,
	type TextStyle,
} from "~/libs/types/types";

type Properties = {
	commonStyles?: StyleProp<TextStyle>;
	itemContainerStyle?: RadioGroupItemStyle;
	label: React.ReactNode;
	option: RadioGroupOption;
	selectedId: string;
};

const CIRCLE_SIZE = 16;

const BorderSize = {
	ACTIVE: 4,
	DEFAULT: 0,
} as const;

const createRadioButtonProperties = ({
	commonStyles,
	itemContainerStyle = {},
	label,
	option,
	selectedId,
}: Properties): RadioButtonProps => {
	const {
		circleBorderColorActive = BaseColor.BG_BLUE,
		circleBorderSize = BorderSize.DEFAULT,
		circleBorderSizeActive = BorderSize.ACTIVE,
		circleColorActive = BaseColor.BG_WHITE,
		circleSize = CIRCLE_SIZE,
	} = itemContainerStyle;

	const radioButtonProperty = {
		containerStyle: [globalStyles.p12, commonStyles, itemContainerStyle],
		id: option.value,
		label,
		size: circleSize,
	} as RadioButtonProps;

	const isActive = radioButtonProperty.id === selectedId;

	if (isActive) {
		radioButtonProperty.borderColor = circleBorderColorActive;
		radioButtonProperty.borderSize = circleBorderSizeActive;
		radioButtonProperty.color = circleColorActive;
	} else {
		radioButtonProperty.borderSize = circleBorderSize;
	}

	return radioButtonProperty;
};

export { createRadioButtonProperties };
