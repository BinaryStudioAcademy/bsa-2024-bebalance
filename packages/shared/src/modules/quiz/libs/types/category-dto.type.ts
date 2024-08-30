import { type QuizScoreDto } from "./types.js";

type CategoryDto = {
	createdAt: string;
	id: number;
	name: string;
	scores: QuizScoreDto[];
	updatedAt: string;
};

export { type CategoryDto };
