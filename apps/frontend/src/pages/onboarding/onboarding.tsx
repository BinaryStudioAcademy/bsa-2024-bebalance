import { Analyzing } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useCallback, useNavigate, useState } from "~/libs/hooks/hooks.js";

import { OnboardingForm } from "./libs/components/components.js";
import { NO_MAGIC, Step } from "./libs/enums/enums.js";

const Onboarding: React.FC = () => {
	const [step, setStep] = useState<number>(Step.ONBOARDING);

	const navigate = useNavigate();

	const handleNextStep = useCallback((): void => {
		setStep((previousStep) => previousStep + NO_MAGIC.ONE);
	}, []);

	const handleAfterAnalyze = useCallback((): void => {
		navigate(AppRoute.QUIZ);
	}, [navigate]);

	const getScreen = (step: number): React.ReactNode => {
		switch (step) {
			case Step.ANALYZING: {
				return <Analyzing onNext={handleAfterAnalyze} />;
			}

			case Step.ONBOARDING: {
				return <OnboardingForm onNext={handleNextStep} />;
			}

			default: {
				return null;
			}
		}
	};

	return <>{getScreen(step)}</>;
};

export { Onboarding };
