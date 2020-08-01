import { app_actions } from "./../actions/app_actions";


export interface IAppState {
  ActiveHTTPRequests: number;
  cartData:any;
  selectedBook:any;
}
const initialState: IAppState = {
  ActiveHTTPRequests: 0,
  cartData:{},
  selectedBook:{}
};
export function App(
  state: IAppState = initialState,
  { type, payload }: any
): IAppState {
  switch (type) {
    case "persist/REHYDRATE": {
      if (payload && payload.App) {
        payload.App.ActiveHTTPRequests = 0;
        return Object.assign({}, state, payload.App);
      } else {
        return Object.assign({}, state);
      }
    }
    case app_actions.Constants.ShowLoader:
      return Object.assign({}, state, {
        ActiveHTTPRequests: state.ActiveHTTPRequests + 1
    
      });
    case app_actions.Constants.HideLoader:
      return Object.assign({}, state, {
        ActiveHTTPRequests:state.ActiveHTTPRequests > 1 ? state.ActiveHTTPRequests - 1 : 0
      });
      case app_actions.Constants.selected_book:
        return Object.assign({}, state, { selectedBook: payload })

       case app_actions.Constants.cart_data:
          return Object.assign({}, state, { cartData: payload })

    case app_actions.Constants.ResetStore:
      return Object.assign({}, state, { userData: payload,isLoggedIn: false });
    default:
      return state;
  }
}