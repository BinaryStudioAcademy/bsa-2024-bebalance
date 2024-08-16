import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';

const thunkExtraArgument = {} as const;

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: thunkExtraArgument,
			},
		}),
	enhancers: getDefaultEnhancers => {
		const defaultEnhancers = getDefaultEnhancers();

		return defaultEnhancers;
	},
	devTools: __DEV__,
});

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;
type AppAsyncThunkConfig = {
	state: RootState;
	dispatch: AppDispatch;
	extra: typeof thunkExtraArgument;
};

export type { RootState, AppDispatch, AppAsyncThunkConfig };
export { store };
