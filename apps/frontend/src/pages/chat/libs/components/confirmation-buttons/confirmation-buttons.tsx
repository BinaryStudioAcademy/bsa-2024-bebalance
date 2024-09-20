import { Button } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	handleNo: () => void;
	handleYes: () => void;
	noButtonLabel: string;
	yesButtonLabel: string;
};

const ChatButtons: React.FC<Properties> = ({
	handleNo,
	handleYes,
	noButtonLabel,
	yesButtonLabel,
}: Properties) => {
	return (
		<div className={styles["button-container"]}>
			<Button label={yesButtonLabel} onClick={handleYes} variant="secondary" />
			<Button label={noButtonLabel} onClick={handleNo} variant="secondary" />
		</div>
	);
};

export { ChatButtons };
