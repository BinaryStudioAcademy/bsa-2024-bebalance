import { Button } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";

import {
	DRAG_THRESHOLD,
	INITIAL_SLIDE,
	INITIAL_X,
	POSITIVE_MIN_THRESHOLD,
	SINGLE_SLIDE,
	SLIDE_WIDTH_PERCENTAGE,
} from "./libs/constants/constants.js";
import { getClientX } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	slides: JSX.Element[];
};

const ExpiredTasksModal: React.FC<Properties> = ({ slides }: Properties) => {
	const [currentSlide, setCurrentSlide] = useState<number>(INITIAL_SLIDE);
	const [startX, setStartX] = useState<number>(INITIAL_X);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const sliderReference = useRef<HTMLDivElement>(null);
	const totalSlides = slides.length;
	const isSingleSlide = totalSlides === SINGLE_SLIDE;

	const goToSlide = useCallback(
		(index: number): void => {
			setCurrentSlide((index + totalSlides) % totalSlides);
		},
		[totalSlides],
	);

	const nextSlide = useCallback((): void => {
		goToSlide(currentSlide + SINGLE_SLIDE);
	}, [currentSlide, goToSlide]);

	const previousSlide = useCallback((): void => {
		goToSlide(currentSlide - SINGLE_SLIDE);
	}, [currentSlide, goToSlide]);

	const handleDragStart = useCallback(
		(event: React.MouseEvent | React.TouchEvent): void => {
			setIsDragging(true);
			const clientX = getClientX(event);
			setStartX(clientX);
		},
		[setIsDragging, setStartX],
	);

	const handleDragMove = useCallback(
		(event: React.MouseEvent | React.TouchEvent) => {
			if (!isDragging) {
				return;
			}

			const clientX = getClientX(event);
			const movementDistance = startX - clientX;

			if (Math.abs(movementDistance) <= DRAG_THRESHOLD) {
				return;
			}

			if (movementDistance > POSITIVE_MIN_THRESHOLD) {
				nextSlide();
			} else {
				previousSlide();
			}

			setIsDragging(false);
		},
		[isDragging, startX, nextSlide, previousSlide, setIsDragging],
	);

	const handleDragEnd = useCallback(() => {
		setIsDragging(false);
	}, [setIsDragging]);

	useEffect(() => {
		if (!sliderReference.current) {
			return;
		}

		const slideTranslationX = currentSlide * SLIDE_WIDTH_PERCENTAGE;
		sliderReference.current.style.transform = `translateX(-${String(slideTranslationX)}%)`;
	}, [currentSlide]);

	return (
		<div className={styles["container"]}>
			<div className={styles["slider-container"]}>
				{!isSingleSlide && (
					<button className={styles["control"]} onClick={previousSlide}>
						<div
							className={getValidClassNames(
								styles["arrow"],
								styles["arrow-left"],
							)}
						/>
					</button>
				)}

				<div className={styles["content"]}>
					<div className={styles["upper-content"]}>
						<h4 className={styles["title"]}>
							The time to complete this task is over
						</h4>
						{isSingleSlide ? (
							<div>
								{slides.map((SlideContent, index) => (
									<div className={styles["slide"]} key={index}>
										{SlideContent}
									</div>
								))}
							</div>
						) : (
							<div
								className={styles["slider"]}
								onMouseDown={handleDragStart}
								onMouseLeave={handleDragEnd}
								onMouseMove={handleDragMove}
								onMouseUp={handleDragEnd}
								onTouchEnd={handleDragEnd}
								onTouchMove={handleDragMove}
								onTouchStart={handleDragStart}
								ref={sliderReference}
								role="button"
								tabIndex={0}
							>
								{slides.map((SlideContent, index) => (
									<div className={styles["slide"]} key={index}>
										{SlideContent}
									</div>
								))}
							</div>
						)}
					</div>

					<div className={styles["lower-content"]}>
						<p className={styles["introduction"]}>
							Do you want to extend the deadline by 24 hours?
						</p>
						<div className={styles["actions"]}>
							<Button label="Yes, I want to extend deadline" />
							<Button
								label="No, I want to skip this task"
								variant="secondary"
							/>
							<Button
								label="I already complete this task"
								variant="secondary"
							/>
						</div>
						<div className={styles["counter"]}>
							<p className={styles["page-number"]}>
								{currentSlide + SINGLE_SLIDE}
							</p>
							<p className={styles["total-page-number"]}>/{totalSlides}</p>
						</div>
					</div>
				</div>

				{!isSingleSlide && (
					<button className={styles["control"]} onClick={nextSlide}>
						<div
							className={getValidClassNames(
								styles["arrow"],
								styles["arrow-right"],
							)}
						/>
					</button>
				)}
			</div>
		</div>
	);
};

export { ExpiredTasksModal };
