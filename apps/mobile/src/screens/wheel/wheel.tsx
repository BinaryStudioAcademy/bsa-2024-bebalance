import { type BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import React from "react";

import {
	Button,
	ScreenWrapper,
	Text,
	View,
	Wheel as WheelChart,
	WhiteBackgroundWrapper,
} from "~/libs/components/components";
import { BottomTabScreenName } from "~/libs/enums/enums";
import { useCallback, useNavigation } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type BottomTabNavigationParameterList } from "~/libs/types/types";

import { styles } from "./styles";

const WHEEL_SIZE = 250;

const Wheel: React.FC = () => {
	const navigation =
		useNavigation<BottomTabNavigationProp<BottomTabNavigationParameterList>>();

	const handleEditPress = useCallback((): void => {
		navigation.navigate(BottomTabScreenName.EDIT_WHEEL_RESULTS);
	}, [navigation]);

	return (
		<WhiteBackgroundWrapper>
			<ScreenWrapper>
				<View style={[globalStyles.m16]}>
					<Text preset="subheading" weight="bold">
						My Wheel Results
					</Text>
					<Text
						preset="tag"
						style={[globalStyles.pv4, globalStyles.ph12, styles.date]}
					>
						5 Aug 2024, Tuesday
					</Text>
					<View style={styles.container}>
						<View style={globalStyles.alignItemsCenter}>
							<WheelChart size={WHEEL_SIZE} />
						</View>
						<View style={[globalStyles.mh48]}>
							<Button label="EDIT MY WHEEL RESULTS" onPress={handleEditPress} />
						</View>
					</View>
				</View>
			</ScreenWrapper>
		</WhiteBackgroundWrapper>
	);
};

export { Wheel };
