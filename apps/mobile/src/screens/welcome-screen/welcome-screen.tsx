import React from "react";

import { BackgroundWrapper } from "~/libs/components/background-wrapper/background-wrapper";
import {
	Button,
	Image,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";
import { ImageSourcePropType } from "~/libs/types/types";

import { styles } from "./styles";

const WelcomeScreen: React.FC = () => {
	return (
		<BackgroundWrapper>
			<ScreenWrapper>
				<View
					style={[
						globalStyles.flex1,
						globalStyles.gap48,
						globalStyles.justifyContentCenter,
						globalStyles.mb16,
						globalStyles.mh12,
						globalStyles.mt32,
						globalStyles.p12,
						styles.container,
					]}
				>
					<Text preset="heading" style={styles.text} weight="extraBold">
						Craft your personal{"\n"}Life Balance Wheel!
					</Text>
					<Image
						source={
							require("~/assets/images/balance-wheel.png") as ImageSourcePropType
						}
						style={styles.image}
					/>
					<Text
						preset="subheading"
						style={[styles.text, globalStyles.pb12]}
						weight="bold"
					>
						Answer a few questions to find out which areas of your life are
						outstanding and which areas you are missing out on
					</Text>
					<Button
						label="Continue"
						onPress={(): void => {
							// Handle Continue
						}}
					/>
				</View>
			</ScreenWrapper>
		</BackgroundWrapper>
	);
};

export { WelcomeScreen };
