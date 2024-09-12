import { type Edge, useSafeAreaInsets } from "react-native-safe-area-context";

import { View } from "~/libs/components/components";
import { Direction, NumericalValue } from "~/libs/enums/enums";
import { globalStyles } from "~/libs/styles/styles";
import { type StyleProp, type ViewStyle } from "~/libs/types/types";

type Properties = {
	children: React.ReactNode;
	edges?: Edge[];
	style?: StyleProp<ViewStyle>;
};

const DEFAULT_SAFE_AREA_EDGES: Edge[] = [
	Direction.TOP,
	Direction.BOTTOM,
	Direction.LEFT,
	Direction.TOP,
];

const ScreenWrapper: React.FC<Properties> = ({
	children,
	edges = DEFAULT_SAFE_AREA_EDGES,
	style,
}: Properties): JSX.Element => {
	const insets = useSafeAreaInsets();

	const paddingStyle = {
		paddingBottom: edges.includes(Direction.BOTTOM)
			? insets.bottom
			: NumericalValue.ZERO,
		paddingLeft: edges.includes(Direction.LEFT)
			? insets.left
			: NumericalValue.ZERO,
		paddingRight: edges.includes(Direction.RIGHT)
			? insets.right
			: NumericalValue.ZERO,
		paddingTop: edges.includes(Direction.TOP)
			? insets.top
			: NumericalValue.ZERO,
	};

	return (
		<View style={[globalStyles.flex1, paddingStyle, style]}>{children}</View>
	);
};

export { ScreenWrapper };
