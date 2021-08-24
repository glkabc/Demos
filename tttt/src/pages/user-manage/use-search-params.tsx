import * as React from 'react';

const SEARCH_PARAMS_ACTIONS = {
  BATCH_UPDATE: 'BATCH_UPDATE',
  CLEAR_ALL_PARAMS: 'CLEAR_ALL_PARAMS',
};

function searchParamsReducer(state: any, { type, payload }: any) {
  switch (type) {
    case SEARCH_PARAMS_ACTIONS.BATCH_UPDATE:
      return { ...state, ...payload };
    case SEARCH_PARAMS_ACTIONS.CLEAR_ALL_PARAMS:
      return initialSearchParamsState;
    default:
      throw new Error(`未知的searchParams type类型：${type}`);
  }
}

function batchUpdateSearchParams(
  dispatch: (arg0: { type: string; payload: any }) => void,
  payload: any,
) {
  // console.log(payload)
  dispatch({ type: SEARCH_PARAMS_ACTIONS.BATCH_UPDATE, payload });
}

function clearAllParams(dispatch: (arg0: { type: string }) => void) {
  dispatch({ type: SEARCH_PARAMS_ACTIONS.CLEAR_ALL_PARAMS });
}

const initialSearchParamsState = {
  userName: '',
  userAccount: '',
};

export default function useSearchParams() {
  return React.useReducer(searchParamsReducer, initialSearchParamsState);
}

export { batchUpdateSearchParams, clearAllParams };
