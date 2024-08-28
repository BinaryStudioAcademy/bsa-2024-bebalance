import { type ScoreData } from "./score-data.type.js";

type Score = {
	createdAt: string;
	updatedAt: string;
} & ScoreData;

export { type Score };
