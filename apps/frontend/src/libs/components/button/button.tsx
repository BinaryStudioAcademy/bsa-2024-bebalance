type Properties = {
	className: string | undefined;
	clickBtn?: (event_: React.BaseSyntheticEvent) => void;
	label: string;
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
	clickBtn,
	label,
	type = "button",
}: Properties) => (
	<button className={className as string} onClick={clickBtn} type={type}>
		{label}
	</button>
);

export { Button };
