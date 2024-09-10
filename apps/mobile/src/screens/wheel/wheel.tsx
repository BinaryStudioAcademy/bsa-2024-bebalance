import { type BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import React from "react";

import {
	Button,
	ScreenWrapper,
	Text,
	View,
	Wheel as WheelChart,
} from "~/libs/components/components";
import { BottomTabScreenName } from "~/libs/enums/enums";
import { useCallback, useNavigation } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type BottomTabNavigationParameterList } from "~/libs/types/types";

const WHEEL_SIZE = 250;

const Wheel: React.FC = () => {
	const navigation =
		useNavigation<BottomTabNavigationProp<BottomTabNavigationParameterList>>();

	const handleEditPress = useCallback((): void => {
		navigation.navigate(BottomTabScreenName.EDIT_WHEEL_RESULTS);
	}, [navigation]);

	return (
		<ScreenWrapper>
			<Text>My wheel results</Text>
			<View style={globalStyles.alignItemsCenter}>
				<WheelChart size={WHEEL_SIZE} />
			</View>
			<View style={[globalStyles.mh48]}>
				<Button label="EDIT MY WHEEL RESULTS" onPress={handleEditPress} />
			</View>
		</ScreenWrapper>
	);
};

export { Wheel };
