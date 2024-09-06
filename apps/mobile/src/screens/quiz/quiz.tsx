import { View } from "react-native";

import { BackgroundWrapper, ScreenWrapper } from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";

import { Counter } from "./libs/components/components";
import { styles } from "./styles";

const Quiz: React.FC = () => {
	return (
		<BackgroundWrapper>
			<ScreenWrapper>
				<View
					style={[
						globalStyles.flex1,
						globalStyles.justifyContentCenter,
						globalStyles.mb16,
						globalStyles.mh12,
						globalStyles.mt32,
						globalStyles.p12,
						styles.container,
					]}
				>
					<Counter currentStep={2} totalSteps={24} />
				</View>
			</ScreenWrapper>
		</BackgroundWrapper>
	);
};

export { Quiz };
