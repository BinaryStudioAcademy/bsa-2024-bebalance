import { Button, Icon } from "~/libs/components/components.js";

import {
	DISLIKE_ALL_SUGGESTIONS_BUTTON_LABEL,
	DISLIKE_SUGGESTIONS_OPTIONS_TEXT,
} from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const DislikeSuggestionsOptions: React.FC = () => {
	return (
		<div className={styles["message-container"]}>
			<Icon name="aiAssistantAvatar" />
			<div className={styles["content-container"]}>
				<div className={styles["content"]}>
					<p>{DISLIKE_SUGGESTIONS_OPTIONS_TEXT}</p>
					<div className={styles["button-container"]}>
						<Button
							label={DISLIKE_ALL_SUGGESTIONS_BUTTON_LABEL}
							variant="secondary"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export { DislikeSuggestionsOptions };
