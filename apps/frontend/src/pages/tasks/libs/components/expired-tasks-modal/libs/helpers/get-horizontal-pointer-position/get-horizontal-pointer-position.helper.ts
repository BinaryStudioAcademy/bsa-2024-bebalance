import { FIRST_TOUCH_INDEX } from "../../constants/constants.js";

const getHorizontalPointerPosition = (
	event: React.MouseEvent | React.TouchEvent,
): number => {
	if ("touches" in event && event.touches[FIRST_TOUCH_INDEX]) {
		return event.touches[FIRST_TOUCH_INDEX].clientX;
	}

	return (event as React.MouseEvent).clientX;
};

export { getHorizontalPointerPosition };
