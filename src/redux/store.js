import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import map from './map/map'
import order from './order/order'
import cars from './cars/cars'

const reducers = combineReducers({
    map,
    order,
    cars
  }
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;