import { createActionPrefixHandler } from 'shared/utils/reduxUtils';
import { SLICE_NAME } from './config';

export const getActionPrefix = createActionPrefixHandler(SLICE_NAME);