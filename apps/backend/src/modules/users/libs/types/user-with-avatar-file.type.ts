import { type OnboardingAnswerModel } from "~/modules/onboarding/onboarding.js";
import { type QuizAnswerModel } from "~/modules/quiz-answers/quiz-answers.js";
import { type TaskModel } from "~/modules/tasks/tasks.js";

import { type UserDetailsWithAvatarFile } from "./user-details-with-avatar-file.type.js";
import { type UserTaskDay } from "./user-task-day.type.js";

type UserWithAvatarFile = {
	createdAt: string;
	email: string;
	id: number;
	onboardingAnswers: OnboardingAnswerModel[];
	passwordHash: string;
	passwordSalt: string;
	quizAnswers: QuizAnswerModel[];
	updatedAt: string;
	userDetails: UserDetailsWithAvatarFile;
	userTaskDays: UserTaskDay[];
	userTasks: TaskModel[];
};

export { type UserWithAvatarFile };
