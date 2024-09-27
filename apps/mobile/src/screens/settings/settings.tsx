import { type ComponentProps } from "react";

import {
	Button,
	OnLeaveModal,
	ScreenWrapper,
	Text,
	View,
} from "~/libs/components/components";
import { useAppDispatch, useCallback, useState } from "~/libs/hooks/hooks";
import { globalStyles } from "~/libs/styles/styles";
import { actions as authActions } from "~/slices/auth/auth";

const Settings: React.FC = () => {
	const dispatch = useAppDispatch();
	const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
		useState<boolean>(false);

	const handleModalDismiss = useCallback((): void => {
		setIsConfirmationModalVisible(false);
	}, []);

	const handleModalShow = useCallback((): void => {
		setIsConfirmationModalVisible(true);
	}, []);

	const handleSignOut = useCallback(
		() => void dispatch(authActions.signOut()),
		[dispatch],
	);

	const modalButtonsConfiguration: ComponentProps<
		typeof OnLeaveModal
	>["buttonsConfiguration"] = [
		{
			appearance: "outlined",
			label: "Yes",
			onPress: handleSignOut,
		},
		{
			appearance: "filled",
			label: "No",
			onPress: handleModalDismiss,
		},
	];

	return (
		<ScreenWrapper edges={["top"]}>
			<View
				style={[
					globalStyles.flex1,
					globalStyles.justifyContentSpaceBetween,
					globalStyles.p16,
				]}
			>
				<Text>Settings!</Text>

				<Button
					iconLeftName="exit-to-app"
					label="SIGN OUT"
					onPress={handleModalShow}
				/>
			</View>
			<OnLeaveModal
				buttonsConfiguration={modalButtonsConfiguration}
				description="Oh no! You're one step away from life balance. Are you sure you
						want to leave?"
				isVisible={isConfirmationModalVisible}
				onBackdropPress={handleModalDismiss}
			/>
		</ScreenWrapper>
	);
};

export { Settings };
