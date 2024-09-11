import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useNavigate,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type NotificationAnswersPayloadDto,
	actions as userActions,
} from "~/modules/users/users.js";

import {
	BalanceWheel,
	Introduction,
	NotificationQuestions,
	QuizForm,
} from "./libs/components/components.js";
import { STEP_INCREMENT } from "./libs/constants/constants.js";
import { Step } from "./libs/enums/enums.js";

const ZERO = 0;

const Quiz: React.FC = () => {
	const [step, setStep] = useState<number>(Step.INTRODUCTION);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { onboardingAnswers } = useAppSelector(({ auth }) => ({
		onboardingAnswers: auth.user?.onboardingAnswers,
	}));

	const handleNextStep = useCallback((): void => {
		setStep((previousStep) => previousStep + STEP_INCREMENT);
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
			onboardingAnswers && onboardingAnswers.length > ZERO;

		if (!hasOnboardingAnswers) {
			navigate(AppRoute.ONBOARDING);
		}
	}, [navigate, onboardingAnswers]);

	const getScreen = (step: number): React.ReactNode => {
		switch (step) {
			case Step.BALANCE_WHEEL: {
				return <BalanceWheel />;
			}

			case Step.INTRODUCTION: {
				return <Introduction onNext={handleNextStep} />;
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
