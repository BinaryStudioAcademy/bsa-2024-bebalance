import { FileModel } from "./files.model.js";
import { FileRepository } from "./files.repository.js";
import { FileService } from "./files.service.js";

const fileRepository = new FileRepository(FileModel);
const fileService = new FileService(fileRepository);

export { fileService };
export { FileEntity } from "./files.entity.js";
export { type FileService } from "./files.service.js";
export { FileError } from "./libs/exceptions/exceptions.js";
