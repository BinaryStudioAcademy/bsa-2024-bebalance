import ValueBubble from "~/assets/img/value-bubble.svg?react";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";

import { SLIDER_BACKGROUND_COLOR } from "./libs/constants/constants.js";
import { formatToKebabCase } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	id: number;
	label: string;
	onValueChange: (categoryId: number, value: number) => void;
	value: number;
};

const Slider: React.FC<Properties> = ({
	id,
	label,
	onValueChange,
	value,
}: Properties) => {
	const MAX = 10;
	const MIN = 0;
	const MIN_SCORE_VALUE = 1;
	const INITIAL_STEP = value;

	const [sliderValue, setSliderValue] = useState<number>(value);
	const [step, setStep] = useState<number>(INITIAL_STEP);
	const rangeReference = useRef<HTMLInputElement>(null);
	const bubbleReference = useRef<HTMLDivElement>(null);

	const categorizedSliderClass = `slider-${formatToKebabCase(label)}`;
	const categorizedGradientBoxClass = `gradient-box-${formatToKebabCase(label)}`;

	const handleSliderBackgroundUpdate = useCallback((): void => {
		if (!rangeReference.current) {
			return;
		}

		const FULL_PROGRESS = 100;

		const currentProgress = ((sliderValue - MIN) / (MAX - MIN)) * FULL_PROGRESS;

		rangeReference.current.style.background = `linear-gradient(to right, transparent ${String(currentProgress)}%, ${SLIDER_BACKGROUND_COLOR} ${String(currentProgress)}%)`;
	}, [sliderValue]);

	const handleValueChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const sliderValue = Number(event.target.value);
			const boundedValue =
				sliderValue < MIN_SCORE_VALUE ? MIN_SCORE_VALUE : sliderValue;
			setSliderValue(boundedValue);

			onValueChange(id, boundedValue);
		},
		[onValueChange, id],
	);

	const updateSliderDimensions = useCallback(() => {
		if (!rangeReference.current) {
			return;
		}

		const sliderThumbCenterOffset = 17;
		const sliderThumbTrackWidth = rangeReference.current.offsetWidth;

		const newStep =
			(sliderThumbTrackWidth - sliderThumbCenterOffset) / (MAX - MIN);
		setStep(newStep);
	}, []);

	useEffect(() => {
		const RESIZE = "resize";

		const handleResize = (): void => {
			updateSliderDimensions();
		};

		updateSliderDimensions();

		window.addEventListener(RESIZE, handleResize);

		return (): void => {
			window.removeEventListener(RESIZE, handleResize);
		};
	}, [updateSliderDimensions]);

	useEffect(() => {
		if (!bubbleReference.current) {
			return;
		}

		handleSliderBackgroundUpdate();
		bubbleReference.current.style.transform = `translateX(${String((sliderValue - MIN) * step)}px)`;
	}, [sliderValue, step, handleSliderBackgroundUpdate]);

	return (
		<div className={styles["container"]}>
			<label className={styles["label"]} htmlFor="slider">
				{label}
			</label>
			<input
				className={getValidClassNames(
					styles["slider"],
					styles[categorizedSliderClass],
				)}
				id="slider"
				max={MAX}
				min={MIN}
				onChange={handleValueChange}
				ref={rangeReference}
				type="range"
				value={sliderValue}
			/>
			<div className={styles["slider-bubble"]} ref={bubbleReference}>
				<p className={styles["bubble-value"]}>{sliderValue}</p>
				<ValueBubble className={styles["bubble-icon"]} />
			</div>
			<div className={styles["gradient-boxes-container"]}>
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						className={getValidClassNames(
							styles["gradient-box"],
							styles[categorizedGradientBoxClass],
						)}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

export { Slider };
