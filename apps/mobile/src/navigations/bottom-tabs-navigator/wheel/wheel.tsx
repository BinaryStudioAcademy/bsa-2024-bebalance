import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { BottomTabScreenName } from "~/libs/enums/enums";
import { type BottomTabNavigationParameterList } from "~/libs/types/types";
import { EditWheelResults } from "~/screens/edit-wheel-results/edit-wheel-results";
import { Wheel } from "~/screens/wheel/wheel";

const WheelStack =
	createNativeStackNavigator<BottomTabNavigationParameterList>();

const WheelStackNavigator: React.FC = () => {
	return (
		<WheelStack.Navigator screenOptions={{ headerShown: false }}>
			<WheelStack.Screen
				component={Wheel}
				name={BottomTabScreenName.WHEEL_SCREEN}
			/>
			<WheelStack.Screen
				component={EditWheelResults}
				name={BottomTabScreenName.EDIT_WHEEL_RESULTS}
			/>
		</WheelStack.Navigator>
	);
};

export { WheelStackNavigator };
