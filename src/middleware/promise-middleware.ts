import isPromise from '../utils/is-promise';
const objectAssign = require('object-assign');

export default function promiseMiddleware({ dispatch }: any) {
  return (next: any) => (action: any) => {
    if (!isPromise(action.payload)) {
      return next(action);
    }

    const { types, payload, meta } = action;
    const { promise, data } = payload;
    const [PENDING, FULFILLED, REJECTED] = types;

    /**
     * Dispatch the pending action
     */
    dispatch(objectAssign({},
      { type: PENDING },
      data ? { payload: data } : {},
      meta ? { meta } : {}
    ));

    /**
     * If successful, dispatch the fulfilled action, otherwise dispatch
     * rejected action.
     */
    return promise.then(
      (result: any) => {
        dispatch({
          type: FULFILLED,
          payload: result,
          meta
        });
      },
      (error: any) => {
        dispatch({
          type: REJECTED,
          payload: error,
          meta
        });
      }
    );
  };
}
