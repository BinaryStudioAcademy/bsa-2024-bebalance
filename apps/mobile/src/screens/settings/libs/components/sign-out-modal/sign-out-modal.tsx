import { type FC } from "react";

import {
	Button,
	GradientIcon,
	Modal,
	Text,
	View,
} from "~/libs/components/components";
import { GradientColor } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";

import { styles } from "./styles";

type ModalButtonConfiguration = {
	label: string;
	onPress: () => void;
	type: "primary" | "secondary";
};

type Properties = {
	buttonsConfiguration: ModalButtonConfiguration[];
	isVisible: boolean;
	onBackdropPress: () => void;
};

const ICON_SIZE = 70;

const SignOutModal: FC<Properties> = ({
	buttonsConfiguration,
	isVisible,
	onBackdropPress,
}) => {
	return (
		<Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
			<View style={[globalStyles.gap16, globalStyles.p16]}>
				<View
					style={[
						globalStyles.alignItemsCenter,
						globalStyles.justifyContentCenter,
						globalStyles.gap12,
					]}
				>
					<GradientIcon
						gradientProps={{ colors: [...GradientColor.BLUE] }}
						name="directions-run"
						size={ICON_SIZE}
					/>
					<Text preset="subheading" style={styles.text}>
						Oh no! You&apos;re one step away from life balance. Are you sure you
						want to leave?
					</Text>
				</View>
				<View style={globalStyles.gap12}>
					{buttonsConfiguration.map(({ label, onPress, type }) => (
						<Button
							appearance={type === "primary" ? "filled" : "outlined"}
							key={label}
							label={label}
							onPress={onPress}
						/>
					))}
				</View>
			</View>
		</Modal>
	);
};

export { SignOutModal };
