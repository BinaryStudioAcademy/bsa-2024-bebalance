import React from "react";

import { SliderContent, View } from "~/libs/components/components";
import { useCallback, useFormController } from "~/libs/hooks/hooks";
import {
	type Control,
	type FieldPath,
	type FieldValues,
	type SliderData,
} from "~/libs/types/types";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	data: SliderData[];
	name: FieldPath<T>;
};

type ScoreItem = { categoryId: number; score: number };

const NO_ITEM_INDEX = -1;

const MultipleSliderInput = <T extends FieldValues>({
	control,
	data,
	name,
}: Properties<T>): JSX.Element | null => {
	const { field } = useFormController({ control, name });
	const { onChange, value } = field;

	const handleSliderChange = useCallback(
		(categoryId: number, score: number) => {
			const currentItems: ScoreItem[] = value || [];
			const existingItemIndex = currentItems.findIndex((item) => {
				return item.categoryId === categoryId;
			});

			const updatedItems =
				existingItemIndex === NO_ITEM_INDEX
					? [...currentItems, { categoryId, score }]
					: currentItems.map((item, index) => {
							return index === existingItemIndex ? { ...item, score } : item;
						});

			onChange(updatedItems);
		},
		[value, onChange],
	);

	return (
		<View>
			{data.map((item) => {
				return (
					<SliderContent
						data={item}
						key={item.id}
						onValueChange={handleSliderChange}
					/>
				);
			})}
		</View>
	);
};

export { MultipleSliderInput };
