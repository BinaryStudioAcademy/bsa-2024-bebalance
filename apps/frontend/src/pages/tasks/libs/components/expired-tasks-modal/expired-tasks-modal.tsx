import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";
import { type TaskDto } from "~/modules/tasks/tasks.js";

import { ArrowButton, TaskActionsPanel, TaskCard } from "../components.js";
import {
	DRAG_THRESHOLD,
	FIRST_SLIDE,
	INITIAL_SLIDE,
	INITIAL_X,
	POSITIVE_MIN_THRESHOLD,
	SINGLE_SLIDE,
	SLIDE_WIDTH_PERCENTAGE,
} from "./libs/constants/constants.js";
import { getClientX } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	tasks: TaskDto[];
};

const ExpiredTasksModal: React.FC<Properties> = ({ tasks }: Properties) => {
	const [currentSlide, setCurrentSlide] = useState<number>(INITIAL_SLIDE);
	const [startX, setStartX] = useState<number>(INITIAL_X);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const sliderReference = useRef<HTMLDivElement>(null);
	const totalSlides = tasks.length;
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
				{!isSingleSlide && <ArrowButton onClick={previousSlide} />}

				<div className={styles["content"]}>
					<div className={styles["upper-content"]}>
						<h4 className={styles["title"]}>
							The time to complete this task is over
						</h4>
						{isSingleSlide ? (
							<div>
								<div className={styles["slide"]}>
									<TaskCard
										task={tasks[FIRST_SLIDE] as TaskDto}
										variant="expired"
									/>
								</div>
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
								{tasks.map((task, index) => (
									<div className={styles["slide"]} key={index}>
										<TaskCard task={task} variant="expired" />
									</div>
								))}
							</div>
						)}
					</div>

					<TaskActionsPanel currentTaskIndex={currentSlide} tasks={tasks} />
				</div>

				{!isSingleSlide && <ArrowButton onClick={nextSlide} variant="right" />}
			</div>
		</div>
	);
};

export { ExpiredTasksModal };
