import { Button } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	slides: JSX.Element[];
};

const INITIAL_SLIDE = 0;
const INITIAL_X = 0;
const INITIAL_IS_DRAG = false;
const SINGLE_SLIDE = 1;
const SLIDE_WIDTH_PERCENTAGE = 100;
const DRAG_THRESHOLD = 50;
const POSITIVE_MIN_THRESHOLD = 0;

const ExpiredTasksSlider: React.FC<Properties> = ({ slides }: Properties) => {
	const [currentSlide, setCurrentSlide] = useState<number>(INITIAL_SLIDE);
	const [startX, setStartX] = useState<number>(INITIAL_X);
	const [isDragging, setIsDragging] = useState<boolean>(INITIAL_IS_DRAG);
	const sliderReference = useRef<HTMLDivElement>(null);

	const goToSlide = useCallback(
		(index: number): void => {
			setCurrentSlide((index + slides.length) % slides.length);
		},
		[slides.length],
	);

	const nextSlide = useCallback((): void => {
		goToSlide(currentSlide + SINGLE_SLIDE);
	}, [currentSlide, goToSlide]);

	const previousSlide = useCallback((): void => {
		goToSlide(currentSlide - SINGLE_SLIDE);
	}, [currentSlide, goToSlide]);

	const handleDragStart = useCallback(
		(event: React.MouseEvent): void => {
			setIsDragging(true);

			if (event.clientX) {
				setStartX(event.clientX);
			}
		},
		[setIsDragging, setStartX],
	);

	const handleDragMove = useCallback(
		(event: React.MouseEvent) => {
			if (!isDragging) {
				return;
			}

			const currentX = event.clientX || INITIAL_X;

			const movementDistance = startX - currentX;

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
				<button className={styles["control"]} onClick={previousSlide}>
					<div
						className={getValidClassNames(
							styles["arrow"],
							styles["arrow-left"],
						)}
					/>
				</button>

				<div className={styles["content"]}>
					<div className={styles["upper-content"]}>
						<h4 className={styles["title"]}>
							The time to complete this task is over
						</h4>
						<div
							className={styles["slider"]}
							onMouseDown={handleDragStart}
							onMouseMove={handleDragMove}
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
							<p className={styles["total-page-number"]}>/{slides.length}</p>
						</div>
					</div>
				</div>

				<button className={styles["control"]} onClick={nextSlide}>
					<div
						className={getValidClassNames(
							styles["arrow"],
							styles["arrow-right"],
						)}
					/>
				</button>
			</div>
		</div>
	);
};

export { ExpiredTasksSlider };
