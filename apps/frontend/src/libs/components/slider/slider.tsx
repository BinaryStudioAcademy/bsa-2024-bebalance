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
	const bubbleLabelReference = useRef<HTMLLabelElement>(null);

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

		updateSliderDimensions();

		const handleResize = (): void => {
			updateSliderDimensions();
		};

		window.addEventListener(RESIZE, handleResize);

		return (): void => {
			window.removeEventListener(RESIZE, handleResize);
		};
	}, [updateSliderDimensions]);

	useEffect(() => {
		if (!bubbleLabelReference.current) {
			return;
		}

		handleSliderBackgroundUpdate();
		bubbleLabelReference.current.style.transform = `translateX(${String((sliderValue - MIN) * step)}px)`;
	}, [sliderValue, step, handleSliderBackgroundUpdate]);

	const categorizedSliderClass = `slider-${formatToKebabCase(label)}`;
	const categorizedGradientBoxClass = `gradient-box-${formatToKebabCase(label)}`;

	return (
		<div className={styles["container"]}>
			<p className={styles["label"]}>{label}</p>
			<input
				className={getValidClassNames(
					styles["slider"],
					styles[categorizedSliderClass],
				)}
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
					<ValueBubble />
				</span>
			</label>
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
