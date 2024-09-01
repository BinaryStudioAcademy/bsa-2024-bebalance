import { type CategoryModel } from "../../category.model.js";

type CategoryScoreModel = {
	id: number;
	score: number;
} & CategoryModel;

export { type CategoryScoreModel };
