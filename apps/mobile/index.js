import { AppRegistry } from "react-native";

import { name as appName } from "./app.json";
import { App } from "./src/libs/components/components";
import { expiredTaskNotification } from "./src/libs/packages/expired-task-notification/expired-task-notification";

expiredTaskNotification.handleBackgroundEvent();

AppRegistry.registerComponent(appName, () => App);
