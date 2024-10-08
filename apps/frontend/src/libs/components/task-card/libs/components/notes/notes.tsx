import { Button, Input } from "~/libs/components/components.js";
import {
	useAppForm,
	useAppSelector,
	useCallback,
	useClickOutside,
	useEffect,
	useRef,
} from "~/libs/hooks/hooks.js";
import {
	type TaskDto,
	type TaskNoteRequestDto,
	taskNoteValidationSchema,
} from "~/modules/tasks/tasks.js";

import { DEFAULT_TASK_NOTE_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onGetTaskNotes: ((id: number) => void) | undefined;
	onNoteClose: () => void;
	onSubmit: (payload: TaskNoteRequestDto) => void;
	task: TaskDto;
};

const Notes: React.FC<Properties> = ({
	onGetTaskNotes,
	onNoteClose,
	onSubmit,
	task,
}: Properties) => {
	const notesReference = useRef<HTMLDivElement | null>(null);
	const { control, errors, handleSubmit } = useAppForm<TaskNoteRequestDto>({
		defaultValues: {
			...DEFAULT_TASK_NOTE_PAYLOAD,
			taskId: task.id,
		},
		validationSchema: taskNoteValidationSchema,
	});
	const { taskNotes } = useAppSelector(({ tasks }) => {
		return {
			taskNotes: tasks.taskNotes.filter(
				(taskNote) => taskNote.taskId === task.id,
			),
		};
	});

	const handleFormSubmit = useCallback(
		(event: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event);
		},
		[onSubmit, handleSubmit],
	);

	useEffect(() => {
		onGetTaskNotes?.(task.id);
	}, [task.id, onGetTaskNotes]);

	useClickOutside(onNoteClose, notesReference);

	return (
		<div className={styles["container"]}>
			<div className={styles["overlay"]} ref={notesReference}>
				<div className={styles["close-btn"]}>
					<Button
						hasVisuallyHiddenLabel
						iconName="closeSmall"
						label="close"
						onClick={onNoteClose}
						variant="icon"
					/>
				</div>

				<h5 className={styles["task-label"]}>{task.label}</h5>
				<div className={styles["note-content"]}>
					{taskNotes.map((taskNote) => {
						return <span key={taskNote.id}>{taskNote.content}</span>;
					})}
				</div>

				<form className={styles["notes-footer"]} onSubmit={handleFormSubmit}>
					<div className={styles["input-container"]}>
						<Input
							control={control}
							errors={errors}
							hasVisuallyHiddenLabel
							isFullWidth
							label="Note content"
							name="content"
							placeholder="Note"
							type="text"
						/>
					</div>

					<div className={styles["submit-btn"]}>
						<Button
							hasVisuallyHiddenLabel
							iconName="arrowNext"
							iconPosition="center"
							label="submit"
							type="submit"
							variant="icon"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export { Notes };
