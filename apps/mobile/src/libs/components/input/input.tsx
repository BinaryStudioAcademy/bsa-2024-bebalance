import React from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { TextInput } from "react-native";

import { Text, View } from "~/libs/components/components";
import { useFormController } from "~/libs/hooks/hooks";

import { styles } from "./styles";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder: string;
};

const Input = <T extends FieldValues>({
	control,
	errors,
	label,
	name,
	placeholder,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const { onBlur, onChange, value } = field;

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	return (
		<View>
			<Text>{label}</Text>
			<TextInput
				onBlur={onBlur}
				onChangeText={onChange}
				placeholder={placeholder}
				style={styles.input}
				value={value}
			/>
			<Text>{hasError && (error as string)}</Text>
		</View>
	);
};

export { Input };
