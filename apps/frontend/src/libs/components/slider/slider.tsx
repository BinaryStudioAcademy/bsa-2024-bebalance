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
	MIN_SCORE_VALUE,
	RESIZE_EVENT,
	SLIDER_BACKGROUND_COLOR,
} from "./libs/constants/constants.js";
import { SliderValue } from "./libs/enums/enums.js";
import { formatToKebabCase } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	id: number;
	isResetSlider?: boolean;
	label: string;
	onValueChange: (categoryId: number, value: number) => void;
	value: number;
};

const Slider: React.FC<Properties> = ({
	id,
	isResetSlider,
	label,
	onValueChange,
	value,
}: Properties) => {
	const [sliderValue, setSliderValue] = useState<number>(value);
	const [step, setStep] = useState<number>(value);
	const rangeReference = useRef<HTMLInputElement | null>(null);
	const bubbleReference = useRef<HTMLDivElement | null>(null);
	const currentSliderValueReference = useRef<number>(value);

	const categorizedSliderClass = `slider-${formatToKebabCase(label)}`;
	const categorizedGradientBoxClass = `gradient-box-${formatToKebabCase(label)}`;

	const handleSliderBackgroundUpdate = useCallback((): void => {
		if (!rangeReference.current) {
			return;
		}

		const currentProgress =
			((sliderValue - SliderValue.MIN) / (SliderValue.MAX - SliderValue.MIN)) *
			FULL_PROGRESS;

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
			(SliderValue.MAX - SliderValue.MIN);
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
		bubbleReference.current.style.transform = `translateX(${String((sliderValue - SliderValue.MIN) * step)}px)`;
	}, [sliderValue, step, handleSliderBackgroundUpdate]);

	useEffect(() => {
		if (isResetSlider && currentSliderValueReference.current !== sliderValue) {
			setSliderValue(currentSliderValueReference.current);
			onValueChange(id, currentSliderValueReference.current);
		}
	}, [isResetSlider, sliderValue, setSliderValue, onValueChange, id]);

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
				max={SliderValue.MAX}
				min={SliderValue.MIN}
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
