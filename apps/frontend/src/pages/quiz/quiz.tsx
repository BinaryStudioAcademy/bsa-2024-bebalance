import { useCallback, useState } from "~/libs/hooks/hooks.js";

import {
	Analyzing,
	BalanceWheel,
	Introduction,
	QuizForm,
} from "./libs/components/components.js";
import { STEP_INCREMENT } from "./libs/constants/constants.js";
import { Step } from "./libs/enums/enums.js";

const Quiz: React.FC = () => {
	const [step, setStep] = useState<number>(Step.ANALYZING);

	const handleNextStep = useCallback((): void => {
		setStep((previousStep) => previousStep + STEP_INCREMENT);
	}, []);

	const getScreen = (step: number): React.ReactNode => {
		switch (step) {
			case Step.ANALYZING: {
				return <Analyzing onNext={handleNextStep} />;
			}

			case Step.INTRODUCTION: {
				return <Introduction onNext={handleNextStep} />;
			}

			case Step.QUIZ: {
				return <QuizForm onNext={handleNextStep} />;
			}

			case Step.BALANCE_WHEEL: {
				return <BalanceWheel />;
			}

			default: {
				return null;
			}
		}
	};

	return <>{getScreen(step)}</>;
};

export { Quiz };
