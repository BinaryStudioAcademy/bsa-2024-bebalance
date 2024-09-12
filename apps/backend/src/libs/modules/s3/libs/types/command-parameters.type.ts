import { type S3File } from "~/modules/files/files.js";

type CommandParameters = { bucket: string } & Partial<S3File>;

export { type CommandParameters };
