import {
	type BottomTabNavigationOptions,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";

import { GradientTabIcon, Text } from "~/libs/components/components";
import { BaseColor, BottomTabScreenName, DataStatus } from "~/libs/enums/enums";
import { useAppDispatch, useAppSelector, useEffect } from "~/libs/hooks/hooks";
import { type BottomTabNavigationParameterList } from "~/libs/types/types";
import { WheelStackNavigator } from "~/navigations/bottom-tabs-navigator/wheel/wheel";
import { Chat } from "~/screens/chat/chat";
import { Settings } from "~/screens/settings/settings";
import { Tasks } from "~/screens/tasks/tasks";
import { actions as appActions } from "~/slices/app/app";

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
	const dispatch = useAppDispatch();
	const dataStatus = useAppSelector(({ app }) => app.dataStatus);
	const initialNotificationId = useAppSelector(
		({ app }) => app.initialNotificationId,
	);
	const isOpenedWithExpiredTaskNotification =
		initialNotificationId === "default";

	const isLoading = dataStatus === DataStatus.PENDING;

	useEffect(() => {
		void dispatch(appActions.updateInitialNotificationId());
	}, [dispatch]);

	if (isLoading) {
		return null;
	}

	return (
		<BottomTabs.Navigator
			initialRouteName={
				isOpenedWithExpiredTaskNotification
					? BottomTabScreenName.TASKS
					: BottomTabScreenName.WHEEL
			}
			screenOptions={screenOptions}
		>
			<BottomTabs.Screen
				component={Chat}
				name={BottomTabScreenName.CHAT}
				options={{
					tabBarIcon: ({ focused }) => (
						<GradientTabIcon isFocused={focused} name="sms" />
					),
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
