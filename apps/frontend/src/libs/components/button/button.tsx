type Properties = {
	className: string | undefined;
	label: string;
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
	label,
	type = "button",
}: Properties) => (
	<button className={className as string} type={type}>
		{label}
	</button>
);

export { Button };
