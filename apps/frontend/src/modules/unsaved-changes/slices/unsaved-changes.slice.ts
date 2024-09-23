import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type State = {
	hasUnsavedChanges: boolean;
	isUserCanceledSaving: boolean;
	nextNavigation: string;
};

const initialState: State = {
	hasUnsavedChanges: false,
	isUserCanceledSaving: true,
	nextNavigation: "",
};

const { actions, reducer } = createSlice({
	initialState,
	name: "unsaved-changes",
	reducers: {
		setHasUnsavedChanges: (state, action: PayloadAction<boolean>) => {
			state.hasUnsavedChanges = action.payload;
		},
		setNextNavigation: (state, action: PayloadAction<string>) => {
			state.nextNavigation = action.payload;
		},
		setUserCanceledSaving: (state, action: PayloadAction<boolean>) => {
			state.isUserCanceledSaving = action.payload;
		},
	},
});

export { actions, reducer };
