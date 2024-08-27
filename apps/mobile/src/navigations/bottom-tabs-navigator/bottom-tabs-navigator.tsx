import {
	type BottomTabNavigationOptions,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { GradientTabIcon } from "~/libs/components/components";
import { BaseColor, BottomTabScreenName } from "~/libs/enums/enums";
import { type BottomTabNavigationParameterList } from "~/libs/types/types";
import { Chat } from "~/screens/chat/chat";
import { Settings } from "~/screens/settings/settings";
import { Tasks } from "~/screens/tasks/tasks";
import { Wheel } from "~/screens/wheel/wheel";

const BottomTabs = createBottomTabNavigator<BottomTabNavigationParameterList>();

const screenOptions: BottomTabNavigationOptions = {
	headerShown: false,
	tabBarActiveTintColor: BaseColor.BLACK,
	tabBarInactiveTintColor: BaseColor.DARK_GRAY,
	tabBarLabelStyle: {
		fontSize: 10,
		fontWeight: 700,
	},
	tabBarStyle: {
		backgroundColor: BaseColor.BG_WHITE,
	},
};

const BottomTabsNavigator = () => {
	return (
		<BottomTabs.Navigator screenOptions={screenOptions}>
			<BottomTabs.Screen
				component={Chat}
				name={BottomTabScreenName.CHAT}
				options={{
					tabBarIcon: ({ focused }) => (
						<GradientTabIcon focused={focused} name="sms" />
					),
				}}
			/>
			<BottomTabs.Screen
				component={Wheel}
				name={BottomTabScreenName.WHEEL}
				options={{
					tabBarIcon: ({ focused }) => (
						<GradientTabIcon focused={focused} name="donut-small" />
					),
				}}
			/>
			<BottomTabs.Screen
				component={Tasks}
				name={BottomTabScreenName.TASKS}
				options={{
					tabBarIcon: ({ focused }) => (
						<GradientTabIcon focused={focused} name="task" />
					),
				}}
			/>
			<BottomTabs.Screen
				component={Settings}
				name={BottomTabScreenName.SETTINGS}
				options={{
					tabBarIcon: ({ focused }) => (
						<GradientTabIcon focused={focused} name="settings" />
					),
				}}
			/>
		</BottomTabs.Navigator>
	);
};

export { BottomTabsNavigator };
