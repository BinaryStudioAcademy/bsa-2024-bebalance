import React from "react";

import AIIcon from "~/assets/svg/ai-icon.svg";
import {
	Icon,
	Text,
	TouchableOpacity,
	View,
} from "~/libs/components/components";
import { BaseColor, BottomTabScreenName } from "~/libs/enums/enums";
import { useCallback, useNavigation } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { type NativeStackNavigationProp } from "~/libs/types/types";

import { type BottomStackParameterList } from "./libs/types/types";
import { styles } from "./styles";

const ICON_SIZE = 24;

const ChatHeader: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<BottomStackParameterList>>();

	const handleGoBack = useCallback((): void => {
		navigation.navigate(BottomTabScreenName.WHEEL);
	}, [navigation]);

	return (
		<TouchableOpacity
			onPress={handleGoBack}
			style={[globalStyles.justifyContentEnd, globalStyles.pb16, styles.header]}
		>
			<View
				style={[
					globalStyles.flexDirectionRow,
					globalStyles.gap12,
					globalStyles.alignItemsCenter,
					globalStyles.pl16,
				]}
			>
				<Icon color={BaseColor.BLACK} name="arrow-back" size={ICON_SIZE} />
				<AIIcon />
				<Text preset="subheading">AI Assistant</Text>
			</View>
		</TouchableOpacity>
	);
};

export { ChatHeader };
