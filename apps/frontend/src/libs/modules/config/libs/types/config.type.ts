import { type Config as LibraryConfig } from "shared";

import { EnvironmentSchema } from "./types.js";

type Config = LibraryConfig<EnvironmentSchema>;

export { type Config };
