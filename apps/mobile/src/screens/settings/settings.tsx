import {
	Icon,
	Pressable,
	ScreenWrapper,
	Text,
} from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks";
import { actions as authActions } from "~/slices/auth/auth";

import { styles } from "./styles";

const iconSize = 40;

const Settings: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleSignOut = useCallback(
		() => void dispatch(authActions.signOut()),
		[dispatch],
	);

	return (
		<ScreenWrapper>
			<Text>Settings!</Text>

			<Pressable onPress={handleSignOut} style={styles.container}>
				<Icon color={BaseColor.BLACK} name="exit-to-app" size={iconSize} />
				<Text preset="subheading">SIGN OUT</Text>
			</Pressable>
		</ScreenWrapper>
	);
};

export { Settings };
