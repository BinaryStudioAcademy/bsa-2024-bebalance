import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

const Category: React.FC = () => {
	return (
		<div
			className={getValidClassNames(styles["border-container"], styles["love"])}
		>
			<div className={styles["content-container"]}>
				<div className={getValidClassNames(styles["circle"], styles["love"])} />
				<div className={styles["content"]}>Love</div>
			</div>
		</div>
	);
};

export { Category };
