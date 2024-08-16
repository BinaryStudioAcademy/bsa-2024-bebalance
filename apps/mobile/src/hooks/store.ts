import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from 'react-redux';

import type { AppDispatch, RootState } from '@app/store/store';

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };
