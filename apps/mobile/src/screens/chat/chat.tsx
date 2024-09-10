import React from "react";

import {
	CheckboxCategoriesForm,
	ScreenWrapper,
	View,
} from "~/libs/components/components";
import { globalStyles } from "~/libs/styles/styles";

const Chat: React.FC = () => {
	return (
		<ScreenWrapper>
			<View style={[globalStyles.flex1, globalStyles.gap12, globalStyles.p12]}>
				<CheckboxCategoriesForm />
			</View>
		</ScreenWrapper>
	);
};

export { Chat };
