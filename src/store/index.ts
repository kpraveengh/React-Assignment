
import {
    applyMiddleware, compose, createStore, Middleware
} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from './../middleware/promise-middleware';
import immutableToJS from './../utils/immutable-to-js';
import {Reducer,persistConfig }from './../reducers/index';
import { persistStore, persistReducer } from 'redux-persist';

const reduxLogger = createLogger({
    collapsed: true,
    stateTransformer: (state: any) => {
        return immutableToJS(state);
    }
});

declare const __DEV__: boolean; // from webpack
const persistedReducer = persistReducer(persistConfig, Reducer)
function configureStore() {
    const _store = createStore(
        persistedReducer,
        compose(
            applyMiddleware(..._getMiddleware())));

    _enableHotLoader(_store);
    return _store;
}
function _getMiddleware(): Middleware[] {
    let middleware = [
        promiseMiddleware,
        thunk

    ];

    if (__DEV__) {
        middleware = [...middleware, reduxLogger];
    }

    return middleware;
}

function _enableHotLoader(_store: any) {
    if (!__DEV__) {
        return;
    }

    const { hot } = module as any;
    if (hot) {
        hot.accept('./../reducers', () => {
            const nextRootReducer = require('./../reducers');
            _store.replaceReducer(nextRootReducer);
        });
    }
}

export const store: any = configureStore();
export const persistor = persistStore(store)

// Listen to store changes and wanr user if offline storage is used abovce 4 MB
// After JSON stringify each char in string will occupy 1 byte space. Verified by exporing complete store to json file
store.subscribe(function () {
    // retrieve latest store state here
    // Ex:
    try {
        let storeSize = (JSON.stringify(store.getState()).length / 1000000);
        if (storeSize > 4) {
        }

    } catch (e) {
        
    }
});
