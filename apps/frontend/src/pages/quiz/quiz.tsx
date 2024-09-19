import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";
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
import { Step } from "./libs/enums/enums.js";

const Quiz: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isRetakingQuiz, step } = useAppSelector(({ quiz }) => quiz);

	const handleNextStep = useCallback((): void => {
		dispatch(quizActions.nextStep());
	}, [dispatch]);

	const { hasAnsweredOnboardingQuestions } = useAppSelector(({ auth }) => ({
		hasAnsweredOnboardingQuestions: auth.user?.hasAnsweredOnboardingQuestions,
	}));

	useEffect(() => {
		if (hasAnsweredOnboardingQuestions) {
			dispatch(quizActions.setStep(Step.INTRODUCTION));
		}
	}, [hasAnsweredOnboardingQuestions, dispatch]);

	const handleNotificationQuestionsSubmit = useCallback(
		(payload: NotificationAnswersPayloadDto): void => {
			void dispatch(userActions.saveNotificationAnswers(payload));
			handleNextStep();
		},
		[dispatch, handleNextStep],
	);

	useEffect(() => {
		if (hasAnsweredOnboardingQuestions && isRetakingQuiz) {
			dispatch(quizActions.setStep(Step.INTRODUCTION));
		}
	}, [dispatch, hasAnsweredOnboardingQuestions, isRetakingQuiz]);

	const getScreen = (step: number): React.ReactNode => {
		switch (step) {
			case Step.MOTIVATION: {
				return <Motivation onNext={handleNextStep} />;
			}

			case Step.ONBOARDING: {
				return <OnboardingForm onNext={handleNextStep} />;
			}

			case Step.ANALYZING: {
				return <Analyzing onNext={handleNextStep} />;
			}

			case Step.INTRODUCTION: {
				return <Introduction onNext={handleNextStep} />;
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
