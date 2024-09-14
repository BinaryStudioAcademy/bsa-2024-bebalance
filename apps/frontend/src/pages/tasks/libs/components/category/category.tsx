import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { convertCategoryNameToCssClassName } from "../../helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	categoryName: string;
};

const Category: React.FC<Properties> = ({ categoryName }: Properties) => {
	const className = convertCategoryNameToCssClassName(categoryName);

	return (
		<div
			className={getValidClassNames(
				styles["border-container"],
				styles[className],
			)}
		>
			<div className={styles["content-container"]}>
				<div
					className={getValidClassNames(styles["circle"], styles[className])}
				/>
				<div className={styles["content"]}>{categoryName}</div>
			</div>
		</div>
	);
};

export { Category };
