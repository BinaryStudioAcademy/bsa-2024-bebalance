import { BalanceWheelChart } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as appActions } from "~/modules/app/app.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";

import { Step } from "../../enums/step.js";
import { BALANCE_WHEEL_ANIMATED_INITIAL_DATA } from "./libs/constants/constants.js";
import { PercentageConfig } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const BalanceWheel: React.FC = () => {
	const dispatch = useAppDispatch();
	const [percentage, setPercentage] = useState<number>(
		PercentageConfig.DEFAULT_VALUE,
	);

	const { hasAnsweredOnboardingQuestions, hasAnsweredQuizQuestions } =
		useAppSelector(({ auth }) => ({
			hasAnsweredOnboardingQuestions: auth.user?.hasAnsweredOnboardingQuestions,
			hasAnsweredQuizQuestions: auth.user?.hasAnsweredQuizQuestions,
		}));

	const handleUpdatePercentage = useCallback(() => {
		setPercentage((previousPercentage) => {
			if (previousPercentage >= PercentageConfig.MAX_VALUE) {
				return previousPercentage;
			}

			const newPercentage =
				previousPercentage + PercentageConfig.INCREMENT_VALUE;

			return newPercentage > PercentageConfig.MAX_VALUE
				? PercentageConfig.MAX_VALUE
				: newPercentage;
		});
	}, []);

	useEffect(() => {
		const intervalId = setInterval(
			handleUpdatePercentage,
			PercentageConfig.PERCENTAGE_INCREASE_INTERVAL,
		);

		return (): void => {
			clearInterval(intervalId);
		};
	}, [handleUpdatePercentage]);

	const isDone =
		percentage >= PercentageConfig.MAX_VALUE &&
		hasAnsweredQuizQuestions &&
		hasAnsweredOnboardingQuestions;

	if (isDone) {
		dispatch(appActions.changeLink(AppRoute.ROOT));
		dispatch(quizActions.setStep(Step.MOTIVATION));
	}

	const roundedPercentage = Math.ceil(percentage);

	return (
		<div className={styles["container"]}>
			<div className={styles["border-container"]} />
			<div className={styles["white-dots"]} />
			<div
				className={getValidClassNames(
					styles["circle-gradient"],
					styles["circle-1"],
				)}
			/>
			<div
				className={getValidClassNames(
					styles["circle-gradient"],
					styles["circle-2"],
				)}
			/>
			<div
				className={getValidClassNames(
					styles["circle-gradient"],
					styles["circle-3"],
				)}
			/>

			<BalanceWheelChart
				data={BALANCE_WHEEL_ANIMATED_INITIAL_DATA}
				isAnimating
			/>
			<span className={styles["text"]}>Analyzing {roundedPercentage}%</span>
		</div>
	);
};

export { BalanceWheel };
