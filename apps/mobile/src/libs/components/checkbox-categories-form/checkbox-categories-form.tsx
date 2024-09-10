import { Checkbox, View } from "~/libs/components/components";
import { useCallback } from "~/libs/hooks/hooks";

type CategoryIds = number[];
type CategoryName =
	| "free time"
	| "friends"
	| "love"
	| "mental"
	| "money"
	| "physical"
	| "spiritual"
	| "work";
type Category = {
	id: number;
	name: CategoryName;
	score: number;
};

type Properties = {
	onSubmit?: (payload: CategoryIds) => void;
};

const CHECKBOX_CATEGORIES_DATA: Category[] = [
	{ id: 1, name: "free time", score: 7 },
	{ id: 2, name: "friends", score: 7 },
	{ id: 3, name: "love", score: 7 },
	{ id: 4, name: "mental", score: 7 },
	{ id: 5, name: "money", score: 7 },
	{ id: 6, name: "physical", score: 7 },
	{ id: 7, name: "spiritual", score: 7 },
	{ id: 8, name: "work", score: 7 },
];

const PLACE_AFTER_VALUE = 1;
const PLACE_BEFORE_VALUE = -1;
const STAY_IN_PLACE_VALUE = 0;
const FIRST_INDEX = 0;
const LOWEST_SCORE_CATEGORIES_QUANTITY = 3;

const getCategoriesSortedByScore = (categoriesData: Category[]): Category[] => {
	return categoriesData
		.map((categoryItem) => ({ ...categoryItem }))
		.sort((a, b) => {
			if (a.score < b.score) {
				return PLACE_BEFORE_VALUE;
			}

			if (a.score > b.score) {
				return PLACE_AFTER_VALUE;
			}

			return STAY_IN_PLACE_VALUE;
		});
};

const getCheckedCategoriesIds = (sortedCategories: Category[]): CategoryIds => {
	return sortedCategories
		.slice(FIRST_INDEX, LOWEST_SCORE_CATEGORIES_QUANTITY)
		.map(({ id }) => id);
};

const CheckboxCategoriesForm: React.FC<Properties> = (): JSX.Element => {
	const categoriesIdsInitialValues = getCheckedCategoriesIds(
		getCategoriesSortedByScore(CHECKBOX_CATEGORIES_DATA),
	);

	const handleValueChange = useCallback((): void => {}, []);

	return (
		<View>
			{CHECKBOX_CATEGORIES_DATA.map(({ id, name }) => {
				const isChecked = categoriesIdsInitialValues.includes(id);

				return (
					<Checkbox
						isChecked={isChecked}
						key={id}
						label={name}
						onValueChange={handleValueChange}
					/>
				);
			})}
		</View>
	);
};

export { CheckboxCategoriesForm };
