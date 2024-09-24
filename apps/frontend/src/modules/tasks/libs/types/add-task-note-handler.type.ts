import { type TaskNoteRequestDto } from "./task-note-request-dto.type.js";

type AddTaskNoteHandler = (payload: TaskNoteRequestDto) => void;

export { type AddTaskNoteHandler };
