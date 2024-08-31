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
	centerPoint: number;
	endPercent: number;
	height: number;
	holeSize: number;
	layerOffset: number;
	startPercent: number;
	stroke: string;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedSector: React.FC<Properties> = ({
	animationTime,
	centerPoint,
	endPercent,
	height,
	holeSize,
	layerOffset,
	startPercent,
	stroke,
}) => {
	const { dashArrayDash, dashArrayGap, dashOffset, radius, strokeWidth } =
		getSectorParameters({
			endPercent,
			height,
			holeSize,
			layerOffset,
			startPercent,
		});

	const ZERO = 0;

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
