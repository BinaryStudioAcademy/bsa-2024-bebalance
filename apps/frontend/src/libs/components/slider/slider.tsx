import { Icon } from "~/libs/components/components.js";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	label: string;
	value: number;
};

const Slider: React.FC<Properties> = ({ label, value }: Properties) => {
	const MAX = 10;
	const MIN = 0;

	const initialStep = 0;
	const [sliderValue, setSliderValue] = useState<number>(value);
	const [step, setStep] = useState<number>(initialStep);
	const rangeReference = useRef<HTMLInputElement>(null);
	const bubbleLabelReference = useRef<HTMLLabelElement>(null);

	const handleValueChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSliderValue(Number(event.target.value));
		},
		[],
	);

	useEffect(() => {
		if (!rangeReference.current) {
			return;
		}

		const sliderThumbCenterOffset = 17;
		const sliderThumbTrackWidth = rangeReference.current.offsetWidth;

		const step =
			(sliderThumbTrackWidth - sliderThumbCenterOffset) / (MAX - MIN);
		setStep(step);
	}, []);

	useEffect(() => {
		if (!bubbleLabelReference.current) {
			return;
		}

		bubbleLabelReference.current.style.transform = `translateX(${String((sliderValue - MIN) * step)}px)`;
	}, [sliderValue, step]);

	return (
		<div className={styles["container"]}>
			<p className={styles["label"]}>{label}</p>
			<input
				className={styles["slider"]}
				id="range"
				max={MAX}
				min={MIN}
				onChange={handleValueChange}
				ref={rangeReference}
				type="range"
				value={sliderValue}
			/>
			<label htmlFor="range" ref={bubbleLabelReference}>
				<span>{sliderValue}</span>
				<Icon name="valueBubble" />
			</label>
		</div>
	);
};

export { Slider };
