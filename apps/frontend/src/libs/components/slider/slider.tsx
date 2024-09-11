import ValueBubble from "~/assets/img/value-bubble.svg?react";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";

import {
	FULL_PROGRESS,
	MAX_VALUE,
	MIN_SCORE_VALUE,
	MIN_VALUE,
	RESIZE_EVENT,
	SLIDER_BACKGROUND_COLOR,
} from "./libs/constants/constants.js";
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
	const [sliderValue, setSliderValue] = useState<number>(value);
	const [step, setStep] = useState<number>(value);
	const rangeReference = useRef<HTMLInputElement | null>(null);
	const bubbleReference = useRef<HTMLDivElement | null>(null);

	const categorizedSliderClass = `slider-${formatToKebabCase(label)}`;
	const categorizedGradientBoxClass = `gradient-box-${formatToKebabCase(label)}`;

	const handleSliderBackgroundUpdate = useCallback((): void => {
		if (!rangeReference.current) {
			return;
		}

		const currentProgress =
			((sliderValue - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * FULL_PROGRESS;

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

	const handleSliderDimensionsUpdate = useCallback(() => {
		if (!rangeReference.current) {
			return;
		}

		const SLIDER_THUMB_CENTER_OFFSET = 17;
		const sliderThumbTrackWidth = rangeReference.current.offsetWidth;

		const newStep =
			(sliderThumbTrackWidth - SLIDER_THUMB_CENTER_OFFSET) /
			(MAX_VALUE - MIN_VALUE);
		setStep(newStep);
	}, []);

	useEffect(() => {
		const handleResize = (): void => {
			handleSliderDimensionsUpdate();
		};

		handleSliderDimensionsUpdate();

		window.addEventListener(RESIZE_EVENT, handleResize);

		return (): void => {
			window.removeEventListener(RESIZE_EVENT, handleResize);
		};
	}, [handleSliderDimensionsUpdate]);

	useEffect(() => {
		if (!bubbleReference.current) {
			return;
		}

		handleSliderBackgroundUpdate();
		bubbleReference.current.style.transform = `translateX(${String((sliderValue - MIN_VALUE) * step)}px)`;
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
				max={MAX_VALUE}
				min={MIN_VALUE}
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
