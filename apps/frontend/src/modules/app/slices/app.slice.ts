import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type State = {
	redirectLink: null | ValueOf<typeof AppRoute>;
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
			action: PayloadAction<null | ValueOf<typeof AppRoute>>,
		) => {
			state.redirectLink = action.payload;
		},
	},
});

export { actions, reducer };
