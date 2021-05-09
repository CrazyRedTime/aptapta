import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import map from "./map/map";
import order from "./order/order";
import cars from "./cars/cars";
import details from "./details/details";
import rates from "./rates/rates";

const reducers = combineReducers({
  map,
  order,
  cars,
  details,
  rates
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;