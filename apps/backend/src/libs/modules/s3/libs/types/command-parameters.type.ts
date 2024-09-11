import { type File } from "~/modules/files/files.js";

type CommandParameters = { bucket: string } & Partial<File>;

export { type CommandParameters };
