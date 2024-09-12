import { initConversation } from "./actions.js";
import { actions } from "./chat.slice.js";

const allActions = {
	...actions,
	initConversation,
};

export { allActions as actions };
export { reducer } from "./chat.slice.js";
