import { type QuizAnswerEntity } from "../../quiz-answer.entity.js";

function extractIdsFromAnswerEntities(
	answerEntities: QuizAnswerEntity[],
): number[] {
	const answerIds: number[] = [];

	for (const answerEntity of answerEntities) {
		const answer = answerEntity.toObject();

		answerIds.push(answer.id);
	}

	return answerIds;
}

export { extractIdsFromAnswerEntities };
