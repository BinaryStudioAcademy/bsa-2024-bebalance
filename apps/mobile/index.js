import notifee from "@notifee/react-native";
import { AppRegistry } from "react-native";

import { name as appName } from "./app.json";
import { App } from "./src/libs/components/components";

notifee.onBackgroundEvent(async ({ detail }) => {
	const { notification } = detail;
	await notifee.cancelNotification(notification.id);
});

AppRegistry.registerComponent(appName, () => App);
