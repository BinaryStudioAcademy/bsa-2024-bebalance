import React from "react";

import { Checkbox, ScreenWrapper, View } from "~/libs/components/components";
import { useState } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";

const Chat: React.FC = () => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	return (
		<ScreenWrapper>
			<View style={[globalStyles.flex1, globalStyles.gap12, globalStyles.p12]}>
				<Checkbox
					isChecked={isChecked}
					label="Physical"
					onValueChange={setIsChecked}
				/>
			</View>
		</ScreenWrapper>
	);
};

export { Chat };
