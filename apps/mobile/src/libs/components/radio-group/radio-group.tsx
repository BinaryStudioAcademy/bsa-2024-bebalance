import React from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { RadioGroup as RNRadioGroup } from "react-native-radio-buttons-group";

import { Text, View } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { useFormController } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type RadioButtonProps, type ViewStyle } from "~/libs/types/types";

import { CIRCLE_SIZE } from "./libs/constants/constants";
import { BorderSize } from "./libs/enums/enums";
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
	value: number;
};

type Properties<T extends FieldValues> = {
	control: Control<T>;
	errors: FieldErrors<T>;
	itemContainerStyle?: RadioGroupItemStyle;
	name: FieldPath<T>;
	onChange?: (value: RadioGroupItem) => void;
	options: RadioGroupItem[];
};

const RadioGroup = <T extends FieldValues>({
	control,
	errors,
	itemContainerStyle = {},
	name,
	options,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const { onChange: onFieldChange, value: selectedId } = field;

	const {
		circleBorderColorActive = BaseColor.BG_BLUE,
		circleBorderSize = BorderSize.DEFAULT,
		circleBorderSizeActive = BorderSize.ACTIVE,
		circleColorActive = BaseColor.BG_WHITE,
		circleSize = CIRCLE_SIZE,
	} = itemContainerStyle;

	const radioButtonsProperties: RadioButtonProps[] = options.map((option)=>{
		const radioButtonProperty = {
			containerStyle: [styles.commonItemContainer, itemContainerStyle],
			id: option.value.toString(),
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
		} as RadioButtonProps;

		const isActive = radioButtonProperty.id === selectedId;

		console.log(`selectedId`,selectedId)

		if (isActive) {
			radioButtonProperty.borderColor = circleBorderColorActive;
			radioButtonProperty.borderSize = circleBorderSizeActive;
			radioButtonProperty.color = circleColorActive;
		} else {
			radioButtonProperty.borderSize = circleBorderSize;
		}

		return radioButtonProperty;
	});

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	return (
		<View>
			<RNRadioGroup
				containerStyle={globalStyles.mb48}
				onPress={onFieldChange}
				radioButtons={radioButtonsProperties}
				selectedId={selectedId}
			/>
			<Text>{hasError && (error as string)}</Text>
		</View>
	);
};

export { RadioGroup };
