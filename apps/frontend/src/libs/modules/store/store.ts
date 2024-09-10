import { config } from "~/libs/modules/config/config.js";

import { Store } from "./store.module.js";

const store = new Store(config);

export { store };
export { type ExtraArguments } from "./store.module.js";
