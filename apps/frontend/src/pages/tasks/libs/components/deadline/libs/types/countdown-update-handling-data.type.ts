import { type Countdown } from "./countdown.type.js";

type CountdownUpdateHandlingData = {
	deadline: string;
	onExpire: () => void;
	setCountdown: React.Dispatch<React.SetStateAction<Countdown>>;
	setIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
};

export { type CountdownUpdateHandlingData };
