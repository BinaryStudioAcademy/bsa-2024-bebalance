import React from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import {
	IconButton,
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
	control: Control<T, null>;
	errors: FieldErrors<T>;
	isAutoFocused?: boolean;
	isSecureTextEntry?: boolean;
	label: string;
	name: FieldPath<T>;
	placeholder: string;
};

const Input = <T extends FieldValues>({
	control,
	errors,
	isAutoFocused = false,
	isSecureTextEntry = false,
	label,
	name,
	placeholder,
}: Properties<T>): JSX.Element => {
	const [secureTextEntry, setSecureTextEntry] =
		useState<boolean>(isSecureTextEntry);
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const { field } = useFormController({ control, name });

	const { onChange, value } = field;

	const error = errors[name]?.message;
	const hasError = Boolean(error);
	const FIRST_COLOR_STOP = -0.4;
	const SECOND_COLOR_STOP = 0.9;

	const borderColors = isFocused
		? [...GradientColor.BLUE]
		: [BaseColor.LIGHT_GRAY, BaseColor.LIGHT_GRAY];
	const conditionalColors = hasError
		? [BaseColor.RED, BaseColor.RED]
		: borderColors;

	const hadleInputBlur = (): void => {
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
				angle={305}
				angleCenter={{ x: 0.5, y: 0.5 }}
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
						onBlur={hadleInputBlur}
						onChangeText={onChange}
						onFocus={handleInputFocus}
						placeholder={placeholder}
						placeholderTextColor={BaseColor.LIGHT_GRAY}
						secureTextEntry={secureTextEntry}
						style={[
							globalStyles.justifyContentCenter,
							globalStyles.alignItemsCenter,
							globalStyles.pl16,
							globalStyles.flex1,
							styles.text,
						]}
						value={value}
					/>
					{isSecureTextEntry && (
						<IconButton
							color={BaseColor.LIGHT_GRAY}
							name={secureTextEntry ? "visibility-off" : "visibility"}
							onPress={() => {
								setSecureTextEntry(!secureTextEntry);
							}}
							size={20}
						/>
					)}
				</View>
			</LinearGradient>
			{hasError && <Text color={BaseColor.RED}>{error as string}</Text>}
		</View>
	);
};

export { Input };
