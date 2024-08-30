import { type QuizScoreDto } from "./types.js";

type ScoreRequestData = Omit<QuizScoreDto, "createdAt" | "id" | "updatedAt">;

export { type ScoreRequestData };
