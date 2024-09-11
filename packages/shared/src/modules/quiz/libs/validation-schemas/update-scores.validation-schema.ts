import { z } from "zod";

import { ScoreValidationMessage, ScoreValidationRule } from "../enums/enums.js";
import { type QuizScoresUpdateItemRequestDto } from "../types/types.js";

type UpdateScoresValidationSchema = {
	items: z.ZodEffects<
		z.ZodArray<
			z.ZodObject<{
				categoryId: z.ZodNumber;
				score: z.ZodNumber;
			}>
		>
	>;
};

const validateUniqueCategoryIds = (
	items: QuizScoresUpdateItemRequestDto[],
): boolean => {
	const categoryIds = items.map((item) => item.categoryId);
	const uniqueCategoryIds = new Set(categoryIds);

	return uniqueCategoryIds.size === categoryIds.length;
};

const updateScores = z.object<UpdateScoresValidationSchema>({
	items: z
		.array(
			z.object({
				categoryId: z.number({
					message: ScoreValidationMessage.INVALID_REQUEST,
				}),
				score: z
					.number({ message: ScoreValidationMessage.INVALID_REQUEST })
					.min(ScoreValidationRule.SCORE_MIN_VALUE, {
						message: ScoreValidationMessage.SCORE_MIN_VALUE,
					})
					.max(ScoreValidationRule.SCORE_MAX_VALUE, {
						message: ScoreValidationMessage.SCORE_MAX_VALUE,
					}),
			}),
		)
		.min(ScoreValidationRule.ITEMS_MIN_LENGTH, {
			message: ScoreValidationMessage.ITEMS_MIN_LENGTH,
		})
		.refine(validateUniqueCategoryIds, {
			message: ScoreValidationMessage.UNIQUE_CATEGORIES,
		}),
});

export { updateScores };
