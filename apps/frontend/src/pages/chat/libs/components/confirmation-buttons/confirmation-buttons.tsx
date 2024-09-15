type Properties = {
	handleNo: () => void;
	handleYes: () => void;
	noButtonLabel: string;
	yesButtonLabel: string;
};

const ConfirmationButtons: React.FC<Properties> = ({
	handleNo,
	handleYes,
	noButtonLabel,
	yesButtonLabel,
}: Properties) => {
	return (
		<div>
			<button onClick={handleYes}>{yesButtonLabel}</button>
			<button onClick={handleNo}>{noButtonLabel}</button>
		</div>
	);
};

export { ConfirmationButtons };
