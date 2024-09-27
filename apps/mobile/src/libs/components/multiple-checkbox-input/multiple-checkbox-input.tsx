import { type StyleProp, type ViewStyle } from "react-native";

import { Checkbox, Text, View } from "~/libs/components/components";
import { BaseColor, NumericalValue } from "~/libs/enums/enums";
import { useCallback, useFormController } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "~/libs/types/types";

import { type InputOption } from "./libs/types/types";

type Properties<T extends FieldValues> = {
	checkAllLabel?: string;
	checkboxStyle?: StyleProp<ViewStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	name: FieldPath<T>;
	options: InputOption[];
};

const MultipleCheckboxInput = <T extends FieldValues>({
	checkAllLabel = "",
	checkboxStyle,
	containerStyle,
	control,
	errors,
	name,
	options,
}: Properties<T>): JSX.Element | null => {
	const { field } = useFormController({ control, name });
	const { onChange, value } = field;
	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const isAllChecked = value.length === options.length;
	const allCategoryIds = options.map(({ id }) => id);

	const handleAllValueChange = useCallback((): void => {
		const nextCategoryIds =
			allCategoryIds.length > value.length ? allCategoryIds : [];
		onChange(nextCategoryIds);
	}, [allCategoryIds, onChange, value]);

	const handleCategoryValueChange = useCallback(
		({ id, isChecked }: { id: number; isChecked: boolean }) =>
			(): void => {
				const previousCategoryIds = value as number[];
				const nextCategoryIds = isChecked
					? previousCategoryIds.filter((categoryId) => categoryId !== id)
					: [...previousCategoryIds, id];
				onChange(nextCategoryIds);
			},
		[onChange, value],
	);

	if (options.length === NumericalValue.ZERO) {
		return null;
	}

	return (
		<>
			{Boolean(checkAllLabel) && (
				<Checkbox
					isChecked={isAllChecked}
					label={checkAllLabel}
					onValueChange={handleAllValueChange}
				/>
			)}
			{options.map(({ id, label }) => {
				const isChecked = (value as number[]).includes(id);

				return (
					<Checkbox
						checkboxStyle={checkboxStyle}
						containerStyle={containerStyle}
						isChecked={isChecked}
						key={id}
						label={label}
						onValueChange={handleCategoryValueChange({ id, isChecked })}
					/>
				);
			})}
			<View style={globalStyles.alignItemsCenter}>
				{hasError && <Text color={BaseColor.RED}>{error as string}</Text>}
			</View>
		</>
	);
};

export { MultipleCheckboxInput };
