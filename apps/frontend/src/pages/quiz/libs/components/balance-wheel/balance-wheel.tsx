import { BalanceWheelChart, Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppSelector,
	useCallback,
	useEffect,
	useNavigate,
	useState,
} from "~/libs/hooks/hooks.js";

import { BALANCE_WHEEL_ANIMATED_INITIAL_DATA } from "./libs/constants/constants.js";
import { PercentageConfig } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const BalanceWheel: React.FC = () => {
	const navigate = useNavigate();
	const [percentage, setPercentage] = useState<number>(
		PercentageConfig.DEFAULT_VALUE,
	);
	const [shouldNavigate, setShouldNavigate] = useState<boolean>(false);

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

	const handleNavigate = useCallback(() => {
		const isDone =
			percentage >= PercentageConfig.MAX_VALUE &&
			hasAnsweredQuizQuestions &&
			hasAnsweredOnboardingQuestions;

		if (isDone) {
			setTimeout(() => {
				setShouldNavigate(true);
			}, PercentageConfig.PERCENTAGE_INCREASE_INTERVAL);
		}
	}, [percentage, hasAnsweredQuizQuestions, hasAnsweredOnboardingQuestions]);

	useEffect(() => {
		handleNavigate();
	}, [handleNavigate]);

	useEffect(() => {
		const intervalId = setInterval(
			handleUpdatePercentage,
			PercentageConfig.PERCENTAGE_INCREASE_INTERVAL,
		);

		return (): void => {
			clearInterval(intervalId);
		};
	}, [handleUpdatePercentage, navigate]);

	if (shouldNavigate) {
		return <Navigate replace to={AppRoute.ROOT} />;
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
