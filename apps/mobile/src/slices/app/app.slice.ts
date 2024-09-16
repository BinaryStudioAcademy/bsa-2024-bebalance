import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type RootScreenName } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type State = {
	redirectLink: null | ValueOf<typeof RootScreenName>;
};

const initialState: State = {
	redirectLink: null,
};

const { actions, reducer } = createSlice({
	initialState,
	name: "app",
	reducers: {
		changeLink: (
			state,
			action: PayloadAction<null | ValueOf<typeof RootScreenName>>,
		) => {
			state.redirectLink = action.payload;
		},
	},
});

export { actions, reducer };
