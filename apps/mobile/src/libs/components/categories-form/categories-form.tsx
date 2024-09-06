import React from "react";

import { Button, Checkbox, Text, View } from "~/libs/components/components";
import { useAppForm, useCallback, useFormController } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import {
	categoriesSavingValidationSchema,
	type CategoryDto,
} from "~/packages/categories/categories";

import { CATEGORIES_FORM_DEFAULT_VALUE } from "./libs/constants/constants";
import { styles } from "./styles";

type Properties = {
	categories: CategoryDto[];
	onSubmit: (selectedCategoryIds: number[]) => void;
};

const CategoriesForm: React.FC<Properties> = ({ categories, onSubmit }) => {
	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: CATEGORIES_FORM_DEFAULT_VALUE,
		validationSchema: categoriesSavingValidationSchema,
	});

	const { field } = useFormController({
		control,
		name: "categoriesIds",
	});

	const { onChange, value: selectedCategories } = field;

	const handleSaveCategories = useCallback((): void => {
		onSubmit(selectedCategories);
	}, [selectedCategories, onSubmit]);

	const handleCheckboxChange = (categoryId: number) => (): void => {
		const updatedCategories = selectedCategories.includes(categoryId)
			? selectedCategories.filter((id) => id !== categoryId)
			: [...selectedCategories, categoryId];
		onChange(updatedCategories);
	};

	const handleAllChange = useCallback(
		(isChecked: boolean): void => {
			const updatedCategories = isChecked
				? categories.map((category) => category.id)
				: [];
			onChange(updatedCategories);
		},
		[categories, onChange],
	);

	const handleFormSubmit = useCallback((): void => {
		void handleSubmit(handleSaveCategories)();
	}, [handleSubmit, handleSaveCategories]);

	return (
		<View style={[globalStyles.flex1, globalStyles.gap12, globalStyles.p16]}>
			<Checkbox
				isChecked={selectedCategories.length === categories.length}
				label="All"
				onValueChange={handleAllChange}
			/>
			{categories.map((category) => (
				<Checkbox
					isChecked={selectedCategories.includes(category.id)}
					key={category.id}
					label={category.name}
					onValueChange={handleCheckboxChange(category.id)}
				/>
			))}
			<View style={globalStyles.pb8}>
				{errors.categoriesIds && (
					<Text style={styles.errorText}>{errors.categoriesIds.message}</Text>
				)}
			</View>

			<Button
				appearance="filled"
				label="Save Categories"
				onPress={handleFormSubmit}
			/>
		</View>
	);
};

export { CategoriesForm };
