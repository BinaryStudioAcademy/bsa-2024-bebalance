import { Icon } from "~/libs/components/components.js";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";

import { getGradientFromLabel } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	label: string;
	value: number;
};

const Slider: React.FC<Properties> = ({ label, value }: Properties) => {
	const MAX = 10;
	const MIN = 0;
	const MIN_SCORE_VALUE = 1;

	const initialStep = 0;
	const [sliderValue, setSliderValue] = useState<number>(value);
	const [step, setStep] = useState<number>(initialStep);
	const rangeReference = useRef<HTMLInputElement>(null);
	const bubbleLabelReference = useRef<HTMLLabelElement>(null);

	const handleSliderBackgroundUpdate = useCallback((): void => {
		if (!rangeReference.current) {
			return;
		}

		const FULL_PROGRESS = 100;

		const currentProgress = ((sliderValue - MIN) / (MAX - MIN)) * FULL_PROGRESS;
		const remainingProgress = FULL_PROGRESS - currentProgress;
		const stepSize = 34;

		// TODO: slider thumb color should depend on gradient color

		const { degree, end, start } = getGradientFromLabel(label);

		rangeReference.current.style.background = `
		repeating-linear-gradient(${degree}, ${end}, ${start} ${String(stepSize)}px)
		0% 0% / ${String(currentProgress)}% 100% no-repeat,
		#d9d9d9 ${String(currentProgress)}%
		0% / ${String(remainingProgress)}% 100%`;
	}, [sliderValue, label, MIN, MAX]);

	const handleValueChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = Number(event.target.value);

			setSliderValue(value < MIN_SCORE_VALUE ? MIN_SCORE_VALUE : value);
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

		handleSliderBackgroundUpdate();
		bubbleLabelReference.current.style.transform = `translateX(${String((sliderValue - MIN) * step)}px)`;
	}, [sliderValue, step, handleSliderBackgroundUpdate]);

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
			<label
				className={styles["slider-bubble"]}
				htmlFor="range"
				ref={bubbleLabelReference}
			>
				<p className={styles["bubble-value"]}>{sliderValue}</p>
				<span className={styles["bubble-icon-wrapper"]}>
					<Icon name="valueBubble" />
				</span>
			</label>
		</div>
	);
};

export { Slider };
