import { Button } from "~/libs/components/components.js";

import { type EditMode } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	currentMode: EditMode;
	handleModeToggle: () => void;
};

const EditModeSwitch: React.FC<Properties> = ({
	currentMode,
	handleModeToggle,
}: Properties) => {
	return (
		<div className={styles["container"]}>
			<Button
				isSelected={currentMode === "manual"}
				label="Edit manually"
				onClick={handleModeToggle}
				variant="switch"
			/>
			<Button
				isSelected={currentMode === "retake_quiz"}
				label="Retake quiz"
				onClick={handleModeToggle}
				variant="switch"
			/>
		</div>
	);
};

export { EditModeSwitch };
