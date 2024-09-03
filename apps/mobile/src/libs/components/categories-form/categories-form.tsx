import React from "react";

import { Button, Checkbox, Text, View } from "~/libs/components/components";
import {
	useAppForm,
	useCallback,
	useEffect,
	useFormController,
	useState,
} from "~/libs/hooks/hooks";
import {
	DEFAULT_ERROR_MESSAGE,
	toastMessage,
} from "~/libs/packages/toast-message/toast-message";
import { globalStyles } from "~/libs/styles/styles";
import { quizCategoriesValidationSchema } from "~/packages/quiz/quiz";

type Properties = {
	categories: { id: number; name: string }[];
};

const CategoriesForm: React.FC<Properties> = ({ categories }) => {
	const [submittedCategories, setSubmittedCategories] = useState<null | string>(
		null,
	);

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
			.filter((cat) => selectedCategories.includes(cat.id))
			.map((cat) => cat.name)
			.join(", ");

		setSubmittedCategories(selectedLabels || null);
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
			const updatedCategories = value ? categories.map((cat) => cat.id) : [];
			setValue("categories", updatedCategories);

			if (!value) {
				setSubmittedCategories(null);
			}
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
		<View style={[globalStyles.flex1, globalStyles.gap12, globalStyles.ph12]}>
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
			<Button appearance="filled" label="Retake Quiz" onPress={handlePress} />
			{submittedCategories && (
				<Text>Selected Categories: {submittedCategories}</Text>
			)}
		</View>
	);
};

export { CategoriesForm };
