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
import {
	PREVIOUS_INDEX_OFFSET,
	ZERO_INDEX,
} from "./libs/constants/constants.js";
import { Step } from "./libs/enums/enums.js";

const Quiz: React.FC = () => {
	const [step, setStep] = useState<number>(Step.ONBOARDING);
	const dispatch = useAppDispatch();

	const { onboardingAnswers } = useAppSelector(({ auth }) => ({
		onboardingAnswers: auth.user?.onboardingAnswers,
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
		const hasOnboardingAnswers =
			onboardingAnswers && onboardingAnswers.length > ZERO_INDEX;

		if (hasOnboardingAnswers) {
			setStep(Step.INTRODUCTION);
		}
	}, [onboardingAnswers]);

	const getScreen = (step: number): React.ReactNode => {
		switch (step) {
			case Step.ANALYZING: {
				return <Analyzing onNext={handleNextStep} />;
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
