import { applyMiddleware, combineReducers, createStore } from "redux";
import productListReducer from "./productListReducer";
import productDetailReducer from "./productDetailReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import CartReducer from "./CartReducer";
import {
  UserDetailReducer,
  UserReducer,
  UserRegisterReducer,
} from "./UserReducer";
import { updateUserProfile } from "./actions/UserAction";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
} from "./OrderReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: CartReducer,
  userLogin: UserReducer,
  userRegister: UserRegisterReducer,
  userDetails: UserDetailReducer,
  userUpdateProfile: updateUserProfile,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderListMy: orderListMyReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },

  userDetails: { user: userInfoFromStorage },
  userUpdateProfile: { success: userInfoFromStorage },
};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
