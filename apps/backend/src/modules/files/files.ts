import { s3 } from "~/libs/modules/s3/s3.js";

import { FileModel } from "./files.model.js";
import { FileRepository } from "./files.repository.js";
import { FileService } from "./files.service.js";

const fileRepository = new FileRepository(FileModel);
const fileService = new FileService(fileRepository, s3);

export { fileService };
export { FileEntity } from "./files.entity.js";
export { type FileService } from "./files.service.js";
export { FileError } from "./libs/exceptions/exceptions.js";
export { type File } from "./libs/types/types.js";
