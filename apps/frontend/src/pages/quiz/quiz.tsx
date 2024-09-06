import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type FinalAnswersPayloadDto,
	actions as userActions,
	type UserDto,
} from "~/modules/users/users.js";

import {
	Analyzing,
	BalanceWheel,
	FinalQuestions,
	Introduction,
	QuizForm,
} from "./libs/components/components.js";
import { STEP_INCREMENT } from "./libs/constants/constants.js";
import { Step } from "./libs/enums/enums.js";

const Quiz: React.FC = () => {
	const dispatch = useAppDispatch();
	const [step, setStep] = useState<number>(Step.ANALYZING);
	const user: UserDto = useAppSelector(({ auth }) => auth.user as UserDto);

	const handleNextStep = useCallback((): void => {
		setStep((previousStep) => previousStep + STEP_INCREMENT);
	}, []);

	const handleFinalQuestionsSubmit = useCallback(
		(payload: FinalAnswersPayloadDto): void => {
			void dispatch(
				userActions.saveFinalAnswers({
					userId: user.id,
					...payload,
				}),
			);
		},
		[dispatch, user.id],
	);

	const getScreen = (step: number): React.ReactNode => {
		switch (step) {
			case Step.ANALYZING: {
				return <Analyzing onNext={handleNextStep} />;
			}

			case Step.BALANCE_WHEEL: {
				return <BalanceWheel />;
			}

			case Step.INTRODUCTION: {
				return <Introduction onNext={handleNextStep} />;
			}

			case Step.FINAL_QUESTIONS: {
				return <FinalQuestions onSubmit={handleFinalQuestionsSubmit} />;
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
