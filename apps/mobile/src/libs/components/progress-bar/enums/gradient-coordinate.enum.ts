const ZERO = 0;
const ONE = 1;

const GradientCoordinate = {
	END: { x: ONE, y: ZERO },
	START: { x: ZERO, y: ZERO },
} as const;

export { GradientCoordinate };
