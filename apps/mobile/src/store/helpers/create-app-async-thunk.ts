import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppAsyncThunkConfig } from '../store';

const createAppAsyncThunk = createAsyncThunk.withTypes<AppAsyncThunkConfig>();

export { createAppAsyncThunk };
