import { useCallback, useState } from "~/libs/hooks/hooks.js";

import { Analyzing } from "./libs/components/analizing/analizing.js";
import { Introduction } from "./libs/components/introduction/introduction.js";
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

			default: {
				return null;
			}
		}
	};

	return <>{getScreen(step)}</>;
};

export { Quiz };
