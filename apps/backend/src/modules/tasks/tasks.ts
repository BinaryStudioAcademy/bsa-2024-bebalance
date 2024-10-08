import { logger } from "~/libs/modules/logger/logger.js";

import { TaskController } from "./task.controller.js";
import { TaskModel } from "./task.model.js";
import { TaskRepository } from "./task.repository.js";
import { TaskService } from "./task.service.js";
import { TaskNoteModel } from "./task-note.model.js";

const taskRepository = new TaskRepository(TaskModel, TaskNoteModel);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(logger, taskService);

export { taskController, taskService };
export { TaskEntity } from "./task.entity.js";
export { TaskModel } from "./task.model.js";
export { type TaskService } from "./task.service.js";
