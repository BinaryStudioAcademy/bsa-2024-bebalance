import { type SelectedCategory } from "../../../categories/categories.js";

type BalanceWheelMessage = {
	lowestCategories: SelectedCategory[];
	text: string;
};

export { type BalanceWheelMessage };
