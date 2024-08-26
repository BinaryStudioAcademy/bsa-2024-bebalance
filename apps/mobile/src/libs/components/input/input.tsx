import React from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import {
	LinearGradient,
	Text,
	TextInput,
	View,
} from "~/libs/components/components";
import { BaseColor, GradientColor } from "~/libs/enums/enums";
import { useFormController, useState } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

type Properties<T extends FieldValues> = {
	accessoryRight?: JSX.Element;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	isAutoFocused?: boolean;
	isSecureTextEntry?: boolean;
	label: string;
	name: FieldPath<T>;
	placeholder: string;
};

const Input = <T extends FieldValues>({
	accessoryRight,
	control,
	errors,
	isAutoFocused = false,
	isSecureTextEntry = false,
	label,
	name,
	placeholder,
}: Properties<T>): JSX.Element => {
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const { field } = useFormController({ control, name });

	const { onChange, value } = field;

	const error = errors[name]?.message;
	const hasError = Boolean(error);
	const FIRST_COLOR_STOP = -0.4;
	const SECOND_COLOR_STOP = 0.9;
	const GRADIENT_ANGLE = 305;
	const ANGLE_CENTER_POINT = 0.5;

	const borderColors = isFocused
		? [...GradientColor.BLUE]
		: [BaseColor.LIGHT_GRAY, BaseColor.LIGHT_GRAY];
	const conditionalColors = hasError
		? [BaseColor.RED, BaseColor.RED]
		: borderColors;

	const handleInputBlur = (): void => {
		setIsFocused(false);
	};

	const handleInputFocus = (): void => {
		setIsFocused(true);
	};

	return (
		<View>
			<Text color={BaseColor.BLACK} size="md" weight="semiBold">
				{label}
			</Text>
			<LinearGradient
				angle={GRADIENT_ANGLE}
				angleCenter={{ x: ANGLE_CENTER_POINT, y: ANGLE_CENTER_POINT }}
				colors={conditionalColors}
				locations={[FIRST_COLOR_STOP, SECOND_COLOR_STOP]}
				style={[
					globalStyles.alignItemsCenter,
					globalStyles.justifyContentCenter,
					globalStyles.p2,
					styles.rounded,
				]}
				useAngle
			>
				<View
					style={[
						globalStyles.flexDirectionRow,
						styles.input,
						styles.rounded,
						globalStyles.alignItemsCenter,
						globalStyles.pr16,
					]}
				>
					<TextInput
						autoFocus={isAutoFocused}
						onBlur={handleInputBlur}
						onChangeText={onChange}
						onFocus={handleInputFocus}
						placeholder={placeholder}
						placeholderTextColor={BaseColor.LIGHT_GRAY}
						secureTextEntry={isSecureTextEntry}
						style={[
							globalStyles.justifyContentCenter,
							globalStyles.alignItemsCenter,
							globalStyles.pl16,
							globalStyles.flex1,
							styles.text,
						]}
						value={value}
					/>
					{accessoryRight}
				</View>
			</LinearGradient>
			{hasError && <Text color={BaseColor.RED}>{error as string}</Text>}
		</View>
	);
};

export { Input };
