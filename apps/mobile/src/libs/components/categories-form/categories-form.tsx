import React from "react";

import { Button, Checkbox, View } from "~/libs/components/components";
import {
	useAppForm,
	useCallback,
	useEffect,
	useFormController,
} from "~/libs/hooks/hooks";
import {
	DEFAULT_ERROR_MESSAGE,
	toastMessage,
} from "~/libs/packages/toast-message/toast-message";
import { globalStyles } from "~/libs/styles/styles";
import {
	type CategoryDto,
	quizCategoriesValidationSchema,
} from "~/packages/quiz/quiz";

type Properties = {
	categories: CategoryDto[];
};

const NO_CATEGORIES_SELECTED = 0;

const CategoriesForm: React.FC<Properties> = ({ categories }) => {
	const { control, errors, handleSubmit, setValue } = useAppForm({
		defaultValues: {
			categories: [] as number[],
		},
		validationSchema: quizCategoriesValidationSchema,
	});

	const { field } = useFormController({
		control,
		name: "categories",
	});

	const selectedCategories = field.value;

	const onSubmit = (): void => {
		const selectedLabels = categories
			.filter((category) => selectedCategories.includes(category.id))
			.map((category) => category.name)
			.join(", ");

		if (selectedLabels.length > NO_CATEGORIES_SELECTED) {
			toastMessage.info({ message: `Selected Categories: ${selectedLabels}` });
		}
	};

	const handlePress = (): void => {
		void handleSubmit(onSubmit)();
	};

	const handleCheckboxChange = useCallback(
		(categoryId: number): void => {
			const updatedCategories = selectedCategories.includes(categoryId)
				? selectedCategories.filter((id) => id !== categoryId)
				: [...selectedCategories, categoryId];
			setValue("categories", updatedCategories);
		},
		[selectedCategories, setValue],
	);

	const handleAllChange = useCallback(
		(value: boolean): void => {
			const updatedCategories = value
				? categories.map((category) => category.id)
				: [];
			setValue("categories", updatedCategories);
		},
		[setValue, categories],
	);

	useEffect(() => {
		if (errors.categories) {
			toastMessage.error({
				message: errors.categories.message || DEFAULT_ERROR_MESSAGE,
			});
		}
	}, [errors.categories]);

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
					onValueChange={handleCheckboxChange.bind(null, category.id)}
				/>
			))}
			<Button
				appearance="filled"
				label="Save Categories"
				onPress={handlePress}
			/>
		</View>
	);
};

export { CategoriesForm };
