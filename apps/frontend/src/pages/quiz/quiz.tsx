import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
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
	NotificationQuestions,
	Onboarding,
	QuizForm,
} from "./libs/components/components.js";
import { STEP_INCREMENT } from "./libs/constants/constants.js";
import { Step } from "./libs/enums/enums.js";

const ZERO = 0;

const Quiz: React.FC = () => {
	const [step, setStep] = useState<number>(Step.ONBOARDING);
	const dispatch = useAppDispatch();

	const { dataStatus, scores } = useAppSelector(({ quiz }) => ({
		dataStatus: quiz.dataStatus,
		scores: quiz.scores,
	}));

	useEffect(() => {
		void dispatch(quizActions.getScores());
	}, [dispatch]);

	useEffect(() => {
		if (dataStatus === DataStatus.FULFILLED && scores.length > ZERO) {
			setStep(Step.INTRODUCTION);
		}
	}, [dataStatus, scores]);

	const handleNextStep = useCallback((): void => {
		setStep((previousStep) => previousStep + STEP_INCREMENT);
	}, []);

	const handleNotificationQuestionsSubmit = useCallback(
		(payload: NotificationAnswersPayloadDto): void => {
			void dispatch(userActions.saveNotificationAnswers(payload));
		},
		[dispatch],
	);

	const getScreen = (step: number): React.ReactNode => {
		switch (step) {
			case Step.ANALYZING_ONBOARDING: {
				return <Analyzing onNext={handleNextStep} />;
			}

			case Step.ANALYZING_QUIZ: {
				return <Analyzing onNext={handleNextStep} />;
			}

			case Step.ONBOARDING: {
				return <Onboarding onNext={handleNextStep} />;
			}

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
