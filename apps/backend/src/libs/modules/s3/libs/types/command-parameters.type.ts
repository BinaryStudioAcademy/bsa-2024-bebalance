import { type UploadedFile } from "~/modules/files/files.js";

type CommandParameters = { bucket: string } & Partial<UploadedFile>;

export { type CommandParameters };
