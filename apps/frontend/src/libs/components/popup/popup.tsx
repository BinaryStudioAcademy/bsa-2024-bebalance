import { Button, Icon } from "~/libs/components/components.js";

import { NEWLINE_CHARACTER } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	closeButtonLabel: string;
	confirmButtonLabel: string;
	hasCloseIcon?: boolean;
	icon: string;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
};

const Popup: React.FC<Properties> = ({
	closeButtonLabel,
	confirmButtonLabel,
	hasCloseIcon,
	icon,
	isOpen = false,
	onClose,
	onConfirm,
	title,
}: Properties) => {
	const multilineTitles: string[] = title.split(NEWLINE_CHARACTER);

	return (
		<dialog className={styles["logout-dialog"]} open={isOpen}>
			<div className={styles["popup-container"]}>
				<div className={styles["contents-container"]}>
					{hasCloseIcon && (
						<button
							className={styles["close-icon-container"]}
							onClick={onClose}
						>
							<Icon name="close" />
						</button>
					)}
					{icon && (
						<div className={styles["icon"]}>
							<img alt={icon} className={styles["img"]} src={icon} />
						</div>
					)}
					<div className={styles["contents"]}>
						{multilineTitles.map((line, index) => {
							return (
								<h1 className={styles["title"]} key={index}>
									{line}
								</h1>
							);
						})}
						<div className={styles["buttons-content"]}>
							<Button label={closeButtonLabel} onClick={onClose} />
							<Button
								label={confirmButtonLabel}
								onClick={onConfirm}
								variant="secondary"
							/>
						</div>
					</div>
				</div>
			</div>
		</dialog>
	);
};

export { Popup };
