import { useAppDispatch, useCallback, useState } from "~/libs/hooks/hooks.js";
import {
	actions as userActions,
	type UserPreferencesPayloadDto,
} from "~/modules/users/users.js";

import {
	Analyzing,
	BalanceWheel,
	FinalQuestions,
	Introduction,
} from "./libs/components/components.js";
import { STEP_INCREMENT } from "./libs/constants/constants.js";
import { Step } from "./libs/enums/enums.js";

const Quiz: React.FC = () => {
	const dispatch = useAppDispatch();
	const [step, setStep] = useState<number>(Step.ANALYZING);

	const handleNextStep = useCallback((): void => {
		setStep((previousStep) => previousStep + STEP_INCREMENT);
	}, []);

	const handleFinalQuestionsSubmit = useCallback(
		(payload: UserPreferencesPayloadDto): void => {
			void dispatch(
				userActions.saveUserPreferences({
					userId: 32,
					...payload,
				}),
			);
		},
		[dispatch],
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

			default: {
				return null;
			}
		}
	};

	return <>{getScreen(step)}</>;
};

export { Quiz };
