import { createAction } from '@reduxjs/toolkit';
import { getActionPrefix } from '../lib/utils';

export const setCurrentProjectId = createAction<number>(
    getActionPrefix('setCurrentProjectId')
);
