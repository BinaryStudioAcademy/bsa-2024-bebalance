import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	hasVisuallyHiddenTitle?: boolean;
	title: string;
};

const ProfileSection: React.FC<Properties> = ({
	children,
	hasVisuallyHiddenTitle,
	title,
}: Properties) => {
	return (
		<section>
			<h4
				className={getValidClassNames(
					styles["title"],
					hasVisuallyHiddenTitle && "visually-hidden",
				)}
			>
				{title}
			</h4>
			<div className={styles["content-container"]}>{children}</div>
		</section>
	);
};

export { ProfileSection };
