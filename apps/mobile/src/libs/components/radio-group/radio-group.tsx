import React from "react";
import { RadioGroup as RNRadioGroup } from "react-native-radio-buttons-group";

import { Text, View } from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { createRadioButtonProperties } from "~/libs/helpers/helpers";
import { useFormController } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
	type RadioButtonProps,
	type RadioGroupItemStyle,
	type RadioGroupOption,
} from "~/libs/types/types";

import { styles } from "./styles";

type Properties<T extends FieldValues> = {
	control: Control<T>;
	errors: FieldErrors<T>;
	itemContainerStyle?: RadioGroupItemStyle;
	name: FieldPath<T>;
	onChange?: (value: RadioGroupOption) => void;
	options: RadioGroupOption[];
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

	const radioButtonsProperties: RadioButtonProps[] = options.map((option) => {
		return createRadioButtonProperties({
			commonStyles: styles.commonItemContainer,
			itemContainerStyle,
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
			option,
			selectedId,
		});
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
			{hasError && <Text color={BaseColor.RED}>{error as string}</Text>}
		</View>
	);
};

export { RadioGroup };
