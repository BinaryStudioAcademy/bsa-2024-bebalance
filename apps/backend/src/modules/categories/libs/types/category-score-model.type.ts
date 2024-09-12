import { type CategoryModel } from "../../category.model.js";

type CategoryScoreModel = {
	score: number;
	userId: number;
} & CategoryModel;

export { type CategoryScoreModel };
