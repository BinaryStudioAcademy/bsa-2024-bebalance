import { type Step } from "~/libs/components/components.js";

const FIRST_STEP_INDEX = 0;
const NEXT_STEP_OFFSET = 1;

const createSteps = (questionsLength: number): Step[] => {
	return Array.from({ length: questionsLength }, (_, index) => ({
		status: index === FIRST_STEP_INDEX ? "current" : "upcoming",
		step: index + NEXT_STEP_OFFSET,
	}));
};

const advanceStep = (steps: Step[]): Step[] => {
	const currentStepIndex = steps.findIndex((step) => step.status === "current");

	return steps.map((step, index) => {
		if (index === currentStepIndex) {
			return { ...step, status: "completed" };
		} else if (index === currentStepIndex + NEXT_STEP_OFFSET) {
			return { ...step, status: "current" };
		}

		return step;
	});
};

const reduceStep = (steps: Step[]): Step[] => {
	const currentStepIndex = steps.findIndex((step) => step.status === "current");

	return steps.map((step, index) => {
		if (index === currentStepIndex) {
			return { ...step, status: "upcoming" };
		} else if (index === currentStepIndex - NEXT_STEP_OFFSET) {
			return { ...step, status: "current" };
		}

		return step;
	});
};

export { advanceStep, createSteps, reduceStep };
