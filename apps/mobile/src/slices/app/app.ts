import { updateInitialNotificationId } from "./actions";
import { actions } from "./app.slice";

const allActions = {
	...actions,
	updateInitialNotificationId,
};

export { allActions as actions };
export { reducer } from "./app.slice";
