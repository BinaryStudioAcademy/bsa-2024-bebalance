import { Button, Icon } from "~/libs/components/components.js";
import { ZERO_INDEX } from "~/libs/constants/constants.js";
import { useCallback } from "~/libs/hooks/hooks.js";

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

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				onClose();
			}
		},
		[onClose],
	);

	return (
		<dialog className={styles["logout-dialog"]} open={isOpen}>
			<div className={styles["popup-container"]}>
				<div className={styles["contents-container"]}>
					{hasCloseIcon && (
						<input
							className={styles["close-icon-container"]}
							onClick={onClose}
							onKeyDown={handleKeyDown}
							role="button"
							tabIndex={ZERO_INDEX}
						>
							<Icon name="close" />
						</input>
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
