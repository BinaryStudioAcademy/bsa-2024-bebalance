import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootScreenName } from "~/libs/enums/enums";
import { type RootNavigationParameterList } from "~/libs/types/types";
import { Onboarding } from "~/screens/onboarding/onboarding";
import { Welcome } from "~/screens/welcome/welcome";

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const OnboardingStack: React.FC = () => {
	return (
		<NativeStack.Navigator>
			<NativeStack.Screen
				name={RootScreenName.ONBOARDING}
				component={Onboarding}
			/>
			<NativeStack.Screen component={Welcome} name={RootScreenName.WELCOME} />
		</NativeStack.Navigator>
	);
};

export { OnboardingStack };
