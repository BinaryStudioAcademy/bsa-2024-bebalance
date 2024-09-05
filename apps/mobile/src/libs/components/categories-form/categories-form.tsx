import React from "react";

import { Button, Checkbox, Text, View } from "~/libs/components/components";
import { useAppForm, useCallback, useFormController } from "~/libs/hooks/hooks";
import { toastMessage } from "~/libs/packages/toast-message/toast-message";
import { globalStyles } from "~/libs/styles/styles";
import {
	type CategoryDto,
	quizCategoriesValidationSchema,
} from "~/packages/quiz/quiz";

import { defaultCategoriesFormValue } from "./libs/values/values";
import { styles } from "./styles";

type Properties = {
	categories: CategoryDto[];
};

const NO_CATEGORIES_SELECTED = 0;

const CategoriesForm: React.FC<Properties> = ({ categories }) => {
	const { control, errors, handleSubmit, trigger } = useAppForm({
		defaultValues: defaultCategoriesFormValue,
		validationSchema: quizCategoriesValidationSchema,
	});

	const { field } = useFormController({
		control,
		name: "categories",
	});

	const { onChange, value: selectedCategories } = field;

	const handleOnSubmit = (): void => {
		const selectedLabels = categories
			.filter((category) => selectedCategories.includes(category.id))
			.map((category) => category.name)
			.join(", ");

		if (selectedLabels.length > NO_CATEGORIES_SELECTED) {
			toastMessage.info({ message: `Selected Categories: ${selectedLabels}` });
		}
	};

	const handleFormSubmit = async (): Promise<void> => {
		const isValid = await trigger("categories");

		if (isValid) {
			void handleSubmit(handleOnSubmit)();
		}
	};

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

	const handleSaveCategories = useCallback((): void => {
		void handleFormSubmit();
	}, [handleFormSubmit]);

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
				{errors.categories && (
					<Text style={styles.errorText}>{errors.categories.message}</Text>
				)}
			</View>

			<Button
				appearance="filled"
				label="Save Categories"
				onPress={handleSaveCategories}
			/>
		</View>
	);
};

export { CategoriesForm };
