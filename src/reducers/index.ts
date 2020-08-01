import { combineReducers } from "redux";
import { App, IAppState } from "./app_reducer";
import storage from 'redux-persist/lib/storage';
export interface IAppStore {
  App: IAppState;
}
export const Reducer = combineReducers({
  App: App,
});
export const persistConfig = {
  key: 'root',
  // timeout: 0,
  storage: storage,
  whitelist: ['App'],
  blacklist: [],
}

