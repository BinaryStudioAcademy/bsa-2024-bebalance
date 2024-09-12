import { type CategoriesSelectedRequestDto } from "~/libs/types/types";

const CHECK_ALL_CATEGORIES_NAME = "All";
const CATEGORIES_FIELD_NAME = "categoryIds";
const CATEGORIES_FORM_DEFAULT_VALUES = {
	[CATEGORIES_FIELD_NAME]: [],
} satisfies CategoriesSelectedRequestDto;

export {
	CATEGORIES_FIELD_NAME,
	CATEGORIES_FORM_DEFAULT_VALUES,
	CHECK_ALL_CATEGORIES_NAME,
};
