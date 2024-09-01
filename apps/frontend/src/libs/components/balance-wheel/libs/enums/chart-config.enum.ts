const CENTER_DIVISOR = 2;

const CHART_CONFIG = {
	CENTER_DIVISOR,
	END_ANGLE: Math.PI * CENTER_DIVISOR,
	RADIUS_DIVISOR: 32,
	START_ANGLE: 0,
} as const;

export { CHART_CONFIG };
