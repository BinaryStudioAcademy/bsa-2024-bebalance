import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { type NotificationIconType } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	notificationType: NotificationIconType;
};

const NotificationIcon: React.FC<Properties> = ({
	notificationType,
}: Properties) => {
	return (
		<div
			className={getValidClassNames(
				styles[notificationType],
				styles["notificaiton-icon"],
			)}
		>
			<Icon name={notificationType} />
		</div>
	);
};

export { NotificationIcon };
