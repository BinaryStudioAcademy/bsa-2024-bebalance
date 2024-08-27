import type { OnboardingQuestionResponseDto, ValueOf } from "shared";

import { createSelector } from "reselect";

import { DataStatus } from "~/libs/enums/app/data-status.enum";

import { ONE } from "./../constants/constants";

interface OnboardingState {
	questions: OnboardingQuestionResponseDto[];
	currentQuestion: OnboardingQuestionResponseDto | null;
	currentQuestionIndex: number;
	dataStatus: ValueOf<typeof DataStatus>;
}

interface AppState {
	onboarding: OnboardingState;
}

const selectOnboarding = (state: AppState) => state.onboarding;

const selectOnboardingState = createSelector(
	[selectOnboarding],
	(onboarding) => ({
		currentQuestionIndex: onboarding.currentQuestionIndex,
		dataStatus: onboarding.dataStatus,
		isLastQuestion:
			onboarding.currentQuestionIndex === onboarding.questions.length - ONE,
		question: onboarding.currentQuestion,
		totalQuestionsAmount: onboarding.questions.length - ONE,
	}),
);

export { selectOnboardingState };
