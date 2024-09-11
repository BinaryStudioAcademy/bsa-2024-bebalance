import { Button } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	closeButtonLabel: string;
	confirmButtonLabel: string;
	icon: string;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
};

const Popup: React.FC<Properties> = ({
	closeButtonLabel,
	confirmButtonLabel,
	icon,
	isOpen = false,
	onClose,
	onConfirm,
	title,
}: Properties) => {
	return (
		<dialog className={styles["logout-dialog"]} open={isOpen}>
			<div className={styles["popup-container"]}>
				<div className={styles["contents-container"]}>
					{icon && (
						<div className={styles["icon"]}>
							<img alt={icon} className={styles["img"]} src={icon} />
						</div>
					)}
					<div className={styles["contents"]}>
						<h1 className={styles["title"]}>{title}</h1>
						<div className={styles["buttons-content"]}>
							<Button label={closeButtonLabel} onClick={onClose} />
							<Button
								isPrimary={false}
								label={confirmButtonLabel}
								onClick={onConfirm}
							/>
						</div>
					</div>
				</div>
			</div>
		</dialog>
	);
};

export { Popup };
