import { Button } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	closeText: string;
	confirmText: string;
	icon: string;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
};

const Popup: React.FC<Properties> = ({
	closeText,
	confirmText,
	icon,
	onClose,
	onConfirm,
	title,
}: Properties) => {
	return (
		<div className={styles["popup-container"]}>
			<div className={styles["contents-container"]}>
				{icon && (
					<div className={styles["icon"]}>
						<img alt={icon} src={icon} />
					</div>
				)}
				<div className={styles["contents"]}>
					<h1 className={styles["title"]}>{title}</h1>
					<div className={styles["buttons-content"]}>
						<Button label={closeText} onClick={onClose} />
						<Button isPrimary={false} label={confirmText} onClick={onConfirm} />
					</div>
				</div>
			</div>
		</div>
	);
};

export { Popup };
