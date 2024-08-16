import { combineReducers } from "@reduxjs/toolkit";

import { reducer as auth } from "./auth/auth-slice";

const rootReducer = combineReducers({
	auth,
});

export { rootReducer };
