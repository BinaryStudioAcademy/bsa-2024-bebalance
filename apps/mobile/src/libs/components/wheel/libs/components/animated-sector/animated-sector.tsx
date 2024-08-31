import { withTiming } from "react-native-reanimated";

import { Animated, Circle } from "~/libs/components/components";
import {
	useAnimatedProps,
	useEffect,
	useSharedValue,
} from "~/libs/hooks/hooks";

import { getSectorParameters } from "../../helpers/helpers";

type Properties = {
	animationTime: number;
	centerGap: number;
	centerPoint: number;
	endPercent: number;
	height: number;
	layerOffset: number;
	startPercent: number;
	stroke: string;
};

const ZERO = 0;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedSector: React.FC<Properties> = ({
	animationTime,
	centerGap,
	centerPoint,
	endPercent,
	height,
	layerOffset,
	startPercent,
	stroke,
}) => {
	const { dashArrayDash, dashArrayGap, dashOffset, radius, strokeWidth } =
		getSectorParameters({
			centerGap,
			endPercent,
			height,
			layerOffset,
			startPercent,
		});

	const animatedArrayDash = useSharedValue(ZERO);
	const animatedArrayGap = useSharedValue(ZERO);
	const animatedDashOffset = useSharedValue(ZERO);
	const animatedRadius = useSharedValue(ZERO);
	const animatedStrokeWidth = useSharedValue(ZERO);

	useEffect(() => {
		animatedRadius.value += radius;
		animatedArrayGap.value += dashArrayGap;
		animatedArrayDash.value += dashArrayDash;
		animatedDashOffset.value += dashOffset;
		animatedStrokeWidth.value += strokeWidth;
	}, []);

	const animatedProperties = useAnimatedProps(() => ({
		r: withTiming(animatedRadius.value, { duration: animationTime }),
		strokeDasharray: [
			withTiming(animatedArrayDash.value, { duration: animationTime }),
			withTiming(animatedArrayGap.value, { duration: animationTime }),
		],
		strokeDashoffset: withTiming(animatedDashOffset.value, {
			duration: animationTime,
		}),
		strokeWidth: withTiming(animatedStrokeWidth.value, {
			duration: animationTime,
		}),
	}));

	return (
		<AnimatedCircle
			animatedProps={animatedProperties}
			cx={centerPoint}
			cy={centerPoint}
			fill="none"
			origin={[ZERO, ZERO]}
			stroke={stroke}
		/>
	);
};

export { AnimatedSector };
