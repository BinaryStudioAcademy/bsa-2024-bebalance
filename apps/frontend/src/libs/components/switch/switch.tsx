import { Button } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties<T> = {
	currentMode: T;
	leftButtonProperties: SwitchButtonProperties<T>;
	onToggleMode: () => void;
	rightButtonProperties: SwitchButtonProperties<T>;
};

type SwitchButtonProperties<T> = {
	label: string;
	mode: T;
};

const Switch = <T extends string>({
	currentMode,
	leftButtonProperties,
	onToggleMode,
	rightButtonProperties,
}: Properties<T>): React.ReactNode => {
	return (
		<div className={styles["container"]}>
			<Button
				isDisabled={currentMode === leftButtonProperties.mode}
				isSelected={currentMode === leftButtonProperties.mode}
				label={leftButtonProperties.label}
				onClick={onToggleMode}
				variant="switch"
			/>
			<Button
				isDisabled={currentMode === rightButtonProperties.mode}
				isSelected={currentMode === rightButtonProperties.mode}
				label={rightButtonProperties.label}
				onClick={onToggleMode}
				variant="switch"
			/>
		</div>
	);
};

export { Switch };
