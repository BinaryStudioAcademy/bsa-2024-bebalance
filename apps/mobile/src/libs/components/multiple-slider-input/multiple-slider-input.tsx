import React, { useCallback } from "react";

import { SliderContent, View } from "~/libs/components/components";
import { useFormController } from "~/libs/hooks/hooks";
import {
	type Control,
	type FieldValues,
	type FieldPath,
	type SliderData,
} from "~/libs/types/types";

type Properties<T extends FieldValues> = {
	data: SliderData[];
	control: Control<T, null>;
	name: FieldPath<T>;
};

const MultipleSliderInput = <T extends FieldValues>({
	data,
	control,
	name,
}: Properties<T>): JSX.Element | null => {
	const { field } = useFormController({ control, name });
	const { onChange, value } = field;

	const handleSliderChange = useCallback(
		(categoryId, score) => {
			const currentItems = value ? value : [];
			const existingItemIndex = currentItems.findIndex(
				(item) => item.categoryId === categoryId,
			);
			let updatedItems;

			if (existingItemIndex !== -1) {
				updatedItems = currentItems.map((item, index) =>
					index === existingItemIndex ? { ...item, score: score } : item,
				);
			} else {
				updatedItems = [...currentItems, { categoryId, score }];
			}

			onChange(updatedItems);
		},
		[value, onChange],
	);

	return (
		<View>
			{data.map((item) => (
				<SliderContent
					key={item.id}
					onValueChange={handleSliderChange}
					data={item}
				/>
			))}
		</View>
	);
};

export { MultipleSliderInput };
