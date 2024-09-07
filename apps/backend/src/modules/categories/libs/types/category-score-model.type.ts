import { type CategoryModel } from "../../category.model.js";

type CategoryScoreModel = {
	categoryId: number;
	id: number;
	score: number;
	userId: number;
} & CategoryModel;

export { type CategoryScoreModel };
