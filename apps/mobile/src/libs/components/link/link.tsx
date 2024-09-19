import { Link as UILink } from "@react-navigation/native";

import { BaseColor } from "~/libs/enums/enums";
import {
	fontWeightToFamily,
	presetToTextStyle,
	sizeToTextStyle,
} from "~/libs/maps/maps";
import {
	type ComponentProps,
	type StyleProp,
	type TextStyle,
	type ValueOf,
} from "~/libs/types/types";

type Properties = {
	color?: ValueOf<typeof BaseColor>;
	label: string;
	preset?: keyof typeof presetToTextStyle;
	size?: keyof typeof sizeToTextStyle;
	style?: StyleProp<TextStyle>;
	to: ComponentProps<typeof UILink>["to"];
	weight?: keyof typeof fontWeightToFamily;
};

const Link: React.FC<Properties> = ({
	color = BaseColor.BLACK,
	label,
	preset = "default",
	size,
	style: styleOverride,
	to,
	weight,
}: Properties) => {
	const styles: StyleProp<TextStyle> = [
		presetToTextStyle[preset],
		size && sizeToTextStyle[size],
		weight && fontWeightToFamily[weight],
		{ color },
		styleOverride,
	];

	return (
		<UILink style={styles} to={to}>
			{label}
		</UILink>
	);
};

export { Link };
