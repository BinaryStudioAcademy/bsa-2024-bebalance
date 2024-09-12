import { type SectorInitialSharedValues } from "~/libs/types/types";

const INITIAL_ANIMATED_VALUE = 0;

const INITIAL_SHARED_DATA: SectorInitialSharedValues = {
	animatedInnerArrayDash: INITIAL_ANIMATED_VALUE,
	animatedInnerArrayGap: INITIAL_ANIMATED_VALUE,
	animatedInnerDashOffset: INITIAL_ANIMATED_VALUE,
	animatedInnerStrokeWidth: INITIAL_ANIMATED_VALUE,
	animatedOuterArrayDash: INITIAL_ANIMATED_VALUE,
	animatedOuterArrayGap: INITIAL_ANIMATED_VALUE,
	animatedOuterDashOffset: INITIAL_ANIMATED_VALUE,
	animatedOuterStrokeWidth: INITIAL_ANIMATED_VALUE,
	animatedRadius: INITIAL_ANIMATED_VALUE,
};

export { INITIAL_SHARED_DATA };
