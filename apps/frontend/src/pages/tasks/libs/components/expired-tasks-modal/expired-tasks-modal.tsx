import { TaskCard } from "~/libs/components/components.js";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type TaskDto,
	type TaskNoteRequestDto,
} from "~/modules/tasks/tasks.js";

import { ArrowButton, TaskActionsPanel } from "../components.js";
import {
	FOCUSABLE_ELEMENT_TAB_INDEX,
	INITIAL_POINTER_POSITION_X,
	SLIDE_WIDTH_PERCENTAGE,
} from "./libs/constants/constants.js";
import { DragThreshold, Slide } from "./libs/enums/enums.js";
import { getHorizontalPointerPosition } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	onAddTaskNote: (payload: TaskNoteRequestDto) => void;
	onGetTaskNotes: (id: number) => void;
	tasks: TaskDto[];
};

const ExpiredTasksModal: React.FC<Properties> = ({
	onAddTaskNote,
	onGetTaskNotes,
	tasks,
}: Properties) => {
	const [currentSlide, setCurrentSlide] = useState<number>(Slide.INITIAL);
	const [pointerStartPositionX, setPointerStartPositionX] = useState<number>(
		INITIAL_POINTER_POSITION_X,
	);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const sliderReference = useRef<HTMLDivElement | null>(null);
	const totalSlides = tasks.length;
	const isSingleSlide = totalSlides === Slide.SINGLE;

	const handleSwitchSlide = useCallback(
		(index: number): void => {
			setCurrentSlide((index + totalSlides) % totalSlides);
		},
		[totalSlides],
	);

	const handleNextSlide = useCallback((): void => {
		handleSwitchSlide(currentSlide + Slide.SINGLE);
	}, [currentSlide, handleSwitchSlide]);

	const handlePreviousSlide = useCallback((): void => {
		handleSwitchSlide(currentSlide - Slide.SINGLE);
	}, [currentSlide, handleSwitchSlide]);

	const handleDragStart = useCallback(
		(event: React.MouseEvent | React.TouchEvent): void => {
			setIsDragging(true);
			const pointerPositionX = getHorizontalPointerPosition(event);
			setPointerStartPositionX(pointerPositionX);
		},
		[setIsDragging, setPointerStartPositionX],
	);

	const handleDragMove = useCallback(
		(event: React.MouseEvent | React.TouchEvent) => {
			if (!isDragging) {
				return;
			}

			const pointerPositionX = getHorizontalPointerPosition(event);
			const movementDistance = pointerStartPositionX - pointerPositionX;

			if (Math.abs(movementDistance) <= DragThreshold.SWIPE_MAXIMUM) {
				return;
			}

			if (movementDistance > DragThreshold.POSITIVE_MINIMUM) {
				handleNextSlide();
			} else {
				handlePreviousSlide();
			}

			setIsDragging(false);
		},
		[
			isDragging,
			pointerStartPositionX,
			handleNextSlide,
			handlePreviousSlide,
			setIsDragging,
		],
	);

	const handleSlideRemoval = useCallback(() => {
		const previousSlide = currentSlide - Slide.SINGLE;
		setCurrentSlide(
			previousSlide < Slide.INITIAL ? Slide.INITIAL : previousSlide,
		);
	}, [currentSlide]);

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
				{!isSingleSlide && <ArrowButton onClick={handlePreviousSlide} />}

				<div className={styles["content"]}>
					<div className={styles["upper-content"]}>
						<h4 className={styles["title"]}>
							The time to complete this task is over
						</h4>
						{isSingleSlide ? (
							<div>
								<div className={styles["slide"]}>
									<TaskCard
										onAddTaskNote={onAddTaskNote}
										onGetTaskNotes={onGetTaskNotes}
										task={tasks[Slide.INITIAL] as TaskDto}
										variant="expired"
									/>
								</div>
							</div>
						) : (
							<div
								className={styles["slider"]}
								onMouseDown={handleDragStart}
								onMouseMove={handleDragMove}
								onTouchMove={handleDragMove}
								onTouchStart={handleDragStart}
								ref={sliderReference}
								role="button"
								tabIndex={FOCUSABLE_ELEMENT_TAB_INDEX}
							>
								{tasks.map((task, index) => (
									<div className={styles["slide"]} key={index}>
										<TaskCard
											onAddTaskNote={onAddTaskNote}
											onGetTaskNotes={onGetTaskNotes}
											task={task}
											variant="expired"
										/>
									</div>
								))}
							</div>
						)}
					</div>

					<TaskActionsPanel
						currentTaskIndex={currentSlide}
						onResolve={handleSlideRemoval}
						tasks={tasks}
					/>
				</div>

				{!isSingleSlide && (
					<ArrowButton onClick={handleNextSlide} variant="right" />
				)}
			</div>
		</div>
	);
};

export { ExpiredTasksModal };
