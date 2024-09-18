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
	name: FieldPath<T>;
	scores: SliderData[];
};

type ScoreItem = { categoryId: number; score: number };

const NO_ITEM_INDEX = -1;

const MultipleSliderInput = <T extends FieldValues>({
	control,
	name,
	scores,
}: Properties<T>): JSX.Element | null => {
	const { field } = useFormController({ control, name });
	const { onChange, value } = field;

	const handleSliderChange = useCallback(
		(categoryId: number, score: number) => {
			const currentItems: ScoreItem[] = value ?? [];
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
			{scores.map((score) => {
				return (
					<SliderContent
						key={score.id}
						onValueChange={handleSliderChange}
						score={score}
					/>
				);
			})}
		</View>
	);
};

export { MultipleSliderInput };
