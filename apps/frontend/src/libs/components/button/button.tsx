type Properties = {
	label: string;
	type?: "button" | "submit";
	variant: "dark" | "secondary";
};

import styles from "../css/button.module.css";

const Button: React.FC<Properties> = ({
	label,
	type = "button",
	variant = "dark",
}: Properties) => {
	const buttonClass = "btn-" + variant;
	return (
		<button
			className={`${styles["btn"] as string} ${styles[buttonClass] as string}`}
			type={type}
		>
			{label}
		</button>
	);
};

export { Button };
