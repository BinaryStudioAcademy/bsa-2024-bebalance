type Properties = {
	className: string;
	clickBtn?: (event_: React.BaseSyntheticEvent) => void;
	isDisabled?: boolean;
	label: string;
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
	clickBtn,
	isDisabled,
	label,
	type = "button",
}: Properties) => (
	<button
		className={className}
		disabled={isDisabled}
		onClick={clickBtn}
		type={type}
	>
		{label}
	</button>
);

export { Button };
