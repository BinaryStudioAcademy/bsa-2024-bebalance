import { ScoreValidationRule } from "./score-validation-rule.enum.js";

const ScoreValidationMessage = {
	INVALID_REQUEST: "Invalid request.",
	ITEMS_MIN_LENGTH: `At least ${String(ScoreValidationRule.ITEMS_MIN_LENGTH)} item to update must be provided.`,
	SCORE_MAX_VALUE: `Score must be at most ${String(ScoreValidationRule.SCORE_MAX_VALUE)}.`,
	SCORE_MIN_VALUE: `Score must be at least ${String(ScoreValidationRule.SCORE_MIN_VALUE)}.`,
	UNIQUE_CATEGORIES: "Categories must be unique.",
} as const;

export { ScoreValidationMessage };
