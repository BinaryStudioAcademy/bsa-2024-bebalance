import { Button } from "~/libs/components/components.js";

import { type EditMode } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	currentMode: EditMode;
	onModeToggle: () => void;
};

const EditModeSwitch: React.FC<Properties> = ({
	currentMode,
	onModeToggle,
}: Properties) => {
	const isManualMode = currentMode === "manual";

	return (
		<div className={styles["container"]}>
			<Button
				isDisabled={isManualMode}
				isSelected={isManualMode}
				label="Edit manually"
				onClick={onModeToggle}
				variant="switch"
			/>
			<Button
				isDisabled={!isManualMode}
				isSelected={!isManualMode}
				label="Retake quiz"
				onClick={onModeToggle}
				variant="switch"
			/>
		</div>
	);
};

export { EditModeSwitch };
