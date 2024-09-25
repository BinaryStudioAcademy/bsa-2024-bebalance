import {
	type BottomTabNavigationOptions,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";

import {
	ChatHeader,
	GradientTabIcon,
	Text,
} from "~/libs/components/components";
import { BaseColor, BottomTabScreenName } from "~/libs/enums/enums";
import { type BottomTabNavigationParameterList } from "~/libs/types/types";
import { WheelStackNavigator } from "~/navigations/bottom-tabs-navigator/wheel/wheel";
import { Chat } from "~/screens/chat/chat";
import { Settings } from "~/screens/settings/settings";
import { Tasks } from "~/screens/tasks/tasks";

import { styles } from "./styles";

const BottomTabs = createBottomTabNavigator<BottomTabNavigationParameterList>();

const screenOptions: BottomTabNavigationOptions = {
	headerShown: false,
	tabBarLabel: ({ children, focused }) => (
		<Text
			color={focused ? BaseColor.BLACK : BaseColor.DARK_GRAY}
			preset="tabBarLabel"
		>
			{children}
		</Text>
	),
	tabBarStyle: {
		backgroundColor: BaseColor.BG_WHITE,
	},
};

const BottomTabsNavigator: React.FC = () => {
	return (
		<BottomTabs.Navigator
			initialRouteName={BottomTabScreenName.WHEEL}
			screenOptions={screenOptions}
		>
			<BottomTabs.Screen
				component={Chat}
				name={BottomTabScreenName.CHAT}
				options={{
					header: (): React.ReactNode => {
						return <ChatHeader />;
					},
					headerShown: true,
					tabBarIcon: ({ focused }) => (
						<GradientTabIcon isFocused={focused} name="sms" />
					),
					tabBarStyle: styles.tabBarHidden,
				}}
			/>
			<BottomTabs.Screen
				component={WheelStackNavigator}
				name={BottomTabScreenName.WHEEL}
				options={{
					tabBarIcon: ({ focused }) => (
						<GradientTabIcon isFocused={focused} name="donut-small" />
					),
				}}
			/>
			<BottomTabs.Screen
				component={Tasks}
				name={BottomTabScreenName.TASKS}
				options={{
					tabBarIcon: ({ focused }) => (
						<GradientTabIcon isFocused={focused} name="task" />
					),
				}}
			/>
			<BottomTabs.Screen
				component={Settings}
				name={BottomTabScreenName.SETTINGS}
				options={{
					tabBarIcon: ({ focused }) => (
						<GradientTabIcon isFocused={focused} name="settings" />
					),
				}}
			/>
		</BottomTabs.Navigator>
	);
};

export { BottomTabsNavigator };
