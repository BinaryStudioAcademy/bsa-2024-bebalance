import { Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type NotificationAnswersPayloadDto,
	actions as userActions,
} from "~/modules/users/users.js";

import {
	Analyzing,
	BalanceWheel,
	Introduction,
	NotificationQuestions,
	OnboardingForm,
	QuizForm,
} from "./libs/components/components.js";
import { NumberValue, Step } from "./libs/enums/enums.js";

const Quiz: React.FC = () => {
	const [step, setStep] = useState<number>(Step.ONBOARDING);
	const dispatch = useAppDispatch();

	const { onboardingAnswers } = useAppSelector(({ auth }) => ({
		onboardingAnswers: auth.user?.onboardingAnswers,
	}));

	const handleNextStep = useCallback((): void => {
		setStep((previousStep) => previousStep + NumberValue.ONE_INDEX);
	}, []);

	const handleNotificationQuestionsSubmit = useCallback(
		(payload: NotificationAnswersPayloadDto): void => {
			void dispatch(userActions.saveNotificationAnswers(payload));
			handleNextStep();
		},
		[dispatch, handleNextStep],
	);

	useEffect(() => {
		const hasOnboardingAnswers =
			onboardingAnswers && onboardingAnswers.length > NumberValue.ZERO_INDEX;

		if (hasOnboardingAnswers) {
			setStep(Step.INTRODUCTION);
		}
	}, [onboardingAnswers]);

	const getScreen = (step: number): React.ReactNode => {
		switch (step) {
			case Step.BALANCE_WHEEL: {
				return <BalanceWheel />;
			}

			case Step.INTRODUCTION: {
				return <Introduction onNext={handleNextStep} />;
			}

			case Step.ROOT: {
				return <Navigate replace to={AppRoute.ROOT} />;
			}

			case Step.ANALYZING: {
				return <Analyzing onNext={handleNextStep} />;
			}

			case Step.ONBOARDING: {
				return <OnboardingForm onNext={handleNextStep} />;
			}

			case Step.NOTIFICATION_QUESTIONS: {
				return (
					<NotificationQuestions onSubmit={handleNotificationQuestionsSubmit} />
				);
			}

			case Step.QUIZ: {
				return <QuizForm onNext={handleNextStep} />;
			}

			default: {
				return null;
			}
		}
	};

	return <>{getScreen(step)}</>;
};

export { Quiz };
