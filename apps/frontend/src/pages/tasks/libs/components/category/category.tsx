import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { convertCategoryNameToKebabCase } from "../../helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	categoryName: string;
	variant?: "active" | "expired";
};

const Category: React.FC<Properties> = ({
	categoryName,
	variant = "active",
}: Properties) => {
	const className = convertCategoryNameToKebabCase(categoryName);

	return (
		<div
			className={getValidClassNames(
				styles["border-container"],
				styles[className],
			)}
		>
			<div
				className={getValidClassNames(
					styles["content-container"],
					styles[`content-container-${variant}`],
				)}
			>
				<div
					className={getValidClassNames(styles["circle"], styles[className])}
				/>
				<div className={styles["content"]}>{categoryName}</div>
			</div>
		</div>
	);
};

export { Category };
