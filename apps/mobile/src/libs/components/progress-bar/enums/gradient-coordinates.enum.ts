const ZERO = 0;
const ONE = 1;

const GradientCoordinates = {
	END: { x: ONE, y: ZERO },
	START: { x: ZERO, y: ZERO },
} as const;

export { GradientCoordinates };
