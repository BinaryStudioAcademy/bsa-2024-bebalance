import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	isPrimary?: boolean;
	label: string;
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	isPrimary = true,
	label,
	type = "button",
}: Properties) => (
	<button
		className={getValidClassNames(`btn ${isPrimary ? "primary" : ""}`, styles)}
		type={type}
	>
		{label}
	</button>
);

export { Button };
