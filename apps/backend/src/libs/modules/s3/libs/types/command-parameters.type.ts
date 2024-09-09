import { type FileParameters } from "./file-parameters.type.js";

type CommandParameters = { bucket: string } & FileParameters;

export { type CommandParameters };
