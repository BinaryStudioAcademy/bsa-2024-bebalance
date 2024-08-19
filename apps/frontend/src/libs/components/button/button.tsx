import clsx from "clsx";

import styles from "./styles.module.css";

type Properties = {
	className?: string;
	label: string;
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
	label,
	type = "button",
}: Properties) => (
	<button className={clsx(styles["btn"], className)} type={type}>
		{label}
	</button>
);

export { Button };
