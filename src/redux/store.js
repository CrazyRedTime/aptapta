import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import map from "./map/map";
import order from "./order/order";
import cars from "./cars/cars";
import details from "./details/details";

const reducers = combineReducers({
  map,
  order,
  cars,
  details,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;