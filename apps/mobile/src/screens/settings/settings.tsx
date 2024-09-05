import {
	Icon,
	Pressable,
	ScreenWrapper,
	Text,
} from "~/libs/components/components";
import { BaseColor } from "~/libs/enums/enums";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { actions as authActions } from "~/slices/auth/auth";

const SIGN_OUT_ICON_SIZE = 40;

const Settings: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleSignOut = useCallback(
		() => void dispatch(authActions.signOut()),
		[dispatch],
	);

	return (
		<ScreenWrapper>
			<Text>Settings!</Text>

			<Pressable
				onPress={handleSignOut}
				style={[
					globalStyles.alignItemsCenter,
					globalStyles.flexDirectionRow,
					globalStyles.gap12,
					globalStyles.mt24,
				]}
			>
				<Icon
					color={BaseColor.BLACK}
					name="exit-to-app"
					size={SIGN_OUT_ICON_SIZE}
				/>
				<Text preset="subheading">SIGN OUT</Text>
			</Pressable>
		</ScreenWrapper>
	);
};

export { Settings };
