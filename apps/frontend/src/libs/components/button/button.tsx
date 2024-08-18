type Properties = {
	className: string;
	label: string;
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
	label,
	type = "button",
}: Properties) => (
	<button className={className} type={type}>
		{label}
	</button>
);

export { Button };
