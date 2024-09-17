import { Button } from "~/libs/components/components.js";
import { type WheelEditMode } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	currentMode: WheelEditMode;
	leftButtonProperties: SwitchButtonProperties;
	onToggleMode: () => void;
	rightButtonProperties: SwitchButtonProperties;
};

type SwitchButtonProperties = {
	label: string;
	mode: WheelEditMode;
};

const Switch: React.FC<Properties> = ({
	currentMode,
	leftButtonProperties,
	onToggleMode,
	rightButtonProperties,
}: Properties) => {
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
