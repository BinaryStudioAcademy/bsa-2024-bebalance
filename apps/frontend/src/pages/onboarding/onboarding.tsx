import { AppRoute } from "~/libs/enums/app-route.enum.js";
import {
	useAppSelector,
	useCallback,
	useEffect,
	useNavigate,
	useState,
} from "~/libs/hooks/hooks.js";

import { Analyzing, OnboardingForm } from "./libs/components/components.js";
import { NO_MAGIC, Step } from "./libs/enums/enums.js";

const Onboarding: React.FC = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState<number>(Step.ONBOARDING);

	const { onboardingAnswers } = useAppSelector(({ auth }) => ({
		onboardingAnswers: auth.user?.onboardingAnswers,
	}));

	const handleNextStep = useCallback((): void => {
		setStep((previousStep) => previousStep + NO_MAGIC.ONE);
	}, []);

	useEffect(() => {
		if (onboardingAnswers && onboardingAnswers.length > NO_MAGIC.ZERO) {
			navigate(AppRoute.QUIZ);
		}
	}, [navigate, onboardingAnswers]);

	const getScreen = (step: number): React.ReactNode => {
		switch (step) {
			case Step.ANALYZING: {
				return <Analyzing />;
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
