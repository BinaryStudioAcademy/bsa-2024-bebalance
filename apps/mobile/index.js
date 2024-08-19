import { AppRegistry } from "react-native";

import { name as appName } from "./app.json";
import { App } from "./src/libs/components/components";

AppRegistry.registerComponent(appName, () => App);
