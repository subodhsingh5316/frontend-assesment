import { applyMiddleware, combineReducers,  compose,  legacy_createStore } from "redux";
import thunk from "redux-thunk";
import dataReducer from "./User/reducer"
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const rootReducer=combineReducers({
 Data: dataReducer

})

const store=legacy_createStore (rootReducer,composeEnhancers(applyMiddleware(thunk)));


export default store;