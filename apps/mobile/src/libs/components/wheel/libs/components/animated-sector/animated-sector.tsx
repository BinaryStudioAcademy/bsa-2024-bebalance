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

const INITIAL_ANIMATED_VALUE = 0;
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

	const animatedArrayDash = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedArrayGap = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedDashOffset = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedRadius = useSharedValue(INITIAL_ANIMATED_VALUE);
	const animatedStrokeWidth = useSharedValue(INITIAL_ANIMATED_VALUE);

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
			origin={[INITIAL_ANIMATED_VALUE, INITIAL_ANIMATED_VALUE]}
			stroke={stroke}
		/>
	);
};

export { AnimatedSector };
