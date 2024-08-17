import { config } from "../config/config";
import { Store } from "./store.package";

const store = new Store(config);

export { store };
