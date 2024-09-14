import { BalanceWheelChart, Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useNavigate,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import { BALANCE_WHEEL_ANIMATED_INITIAL_DATA } from "./libs/constants/constants.js";
import { PercentageConfig } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const BalanceWheel: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [percentage, setPercentage] = useState<number>(
		PercentageConfig.DEFAULT_VALUE,
	);

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
	}, [handleUpdatePercentage, navigate]);

	if (percentage >= PercentageConfig.MAX_VALUE) {
		void dispatch(authActions.getAuthenticatedUser());

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
