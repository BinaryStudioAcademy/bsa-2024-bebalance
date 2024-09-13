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
	Motivation,
	NotificationQuestions,
	OnboardingForm,
	QuizForm,
} from "./libs/components/components.js";
import { PREVIOUS_INDEX_OFFSET } from "./libs/constants/constants.js";
import { Step } from "./libs/enums/enums.js";

const Quiz: React.FC = () => {
	const [step, setStep] = useState<number>(Step.MOTIVATION);
	const dispatch = useAppDispatch();

	const { hasAnsweredOnboardingQuestions } = useAppSelector(({ auth }) => ({
		hasAnsweredOnboardingQuestions: auth.user?.hasAnsweredOnboardingQuestions,
	}));

	const handleNextStep = useCallback((): void => {
		setStep((previousStep) => previousStep + PREVIOUS_INDEX_OFFSET);
	}, []);

	const handleNotificationQuestionsSubmit = useCallback(
		(payload: NotificationAnswersPayloadDto): void => {
			void dispatch(userActions.saveNotificationAnswers(payload));
			handleNextStep();
		},
		[dispatch, handleNextStep],
	);

	useEffect(() => {
		if (hasAnsweredOnboardingQuestions) {
			setStep(Step.INTRODUCTION);
		}
	}, [hasAnsweredOnboardingQuestions]);

	const getScreen = (step: number): React.ReactNode => {
		switch (step) {
			case Step.ANALYZING: {
				return <Analyzing onNext={handleNextStep} />;
			}

			case Step.MOTIVATION: {
				return <Motivation onNext={handleNextStep} />;
			}

			case Step.INTRODUCTION: {
				return <Introduction onNext={handleNextStep} />;
			}

			case Step.ONBOARDING: {
				return <OnboardingForm onNext={handleNextStep} />;
			}

			case Step.QUIZ: {
				return <QuizForm onNext={handleNextStep} />;
			}

			case Step.NOTIFICATION_QUESTIONS: {
				return (
					<NotificationQuestions onSubmit={handleNotificationQuestionsSubmit} />
				);
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
