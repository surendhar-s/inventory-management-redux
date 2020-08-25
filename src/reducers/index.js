import { combineReducers } from "redux";
import productListReducer from "./productListReducer";
import userDetailReducer from "./userDetailsReduer";
const reducers = combineReducers({
    productList: productListReducer,
    userDetails: userDetailReducer
})

export default reducers;