import React from "react";
import { Animated } from "react-native";

import { Text } from "~/libs/components/components";
import { BaseColor, TextAnimationConfig } from "~/libs/enums/enums";

const createAnimatedText = (
	text: string,
	initDelay: number = TextAnimationConfig.INIT_DELAY,
): React.ReactNode => {
	const words = text.split(" ");

	return words.map((word, index) => {
		const animatedOpacity = new Animated.Value(
			TextAnimationConfig.INITIAL_OPACITY,
		);

		Animated.timing(animatedOpacity, {
			delay:
				initDelay +
				index *
					TextAnimationConfig.DELAY_MULTIPLIER *
					TextAnimationConfig.DELAY_MULTIPLIER_MS,
			duration: TextAnimationConfig.ANIMATION_DURATION_MS,
			toValue: TextAnimationConfig.FINAL_OPACITY,
			useNativeDriver: true,
		}).start();

		return (
			<Animated.View
				key={`${word}-${index.toString()}`}
				style={{ opacity: animatedOpacity }}
			>
				<Text
					color={BaseColor.BG_WHITE}
					size="sm"
					weight="regular"
				>{`${word} \u00A0`}</Text>
			</Animated.View>
		);
	});
};

export { createAnimatedText };
