import { s3 } from "~/libs/modules/s3/s3.js";

import { FileModel } from "./file.model.js";
import { FileRepository } from "./file.repository.js";
import { FileService } from "./file.service.js";

const fileRepository = new FileRepository(FileModel);
const fileService = new FileService(fileRepository, s3);

export { fileService };
export { FileEntity } from "./file.entity.js";
export { type FileService } from "./file.service.js";
export { FileError } from "./libs/exceptions/exceptions.js";
export { type File } from "./libs/types/types.js";
