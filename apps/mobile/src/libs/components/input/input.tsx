import React from "react";

import {
	LinearGradient,
	Text,
	TextInput,
	View,
} from "~/libs/components/components";
import { AngleGradient, BaseColor, GradientColor } from "~/libs/enums/enums";
import { useCallback, useFormController, useState } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "~/libs/types/types";

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

	const borderColors = isFocused
		? [...GradientColor.BLUE]
		: [BaseColor.LIGHT_GRAY, BaseColor.LIGHT_GRAY];
	const conditionalColors = hasError
		? [BaseColor.RED, BaseColor.RED]
		: borderColors;

	const handleInputBlur = useCallback((): void => {
		setIsFocused(false);
	}, []);

	const handleInputFocus = useCallback((): void => {
		setIsFocused(true);
	}, []);

	return (
		<View>
			<Text color={BaseColor.BLACK} size="md" weight="semiBold">
				{label}
			</Text>
			<LinearGradient
				angle={AngleGradient.ANGLE}
				angleCenter={{ x: AngleGradient.X_POINT, y: AngleGradient.SECOND_STOP }}
				colors={conditionalColors}
				locations={[AngleGradient.FIRST_STOP, AngleGradient.SECOND_STOP]}
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
