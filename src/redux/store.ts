import { configureStore } from "@reduxjs/toolkit";
import { ActionType, AppState, Action } from "../types/types";

// Define the reducer
const initialState: AppState = {
  orders: [],
  ordersResults: [],
  openModal: false,
  targetToken: "ETH",
  customRecipient: "",
  isCustomRecipient: false,
};

function reducer(state: AppState = initialState, action: Action): AppState {
  switch (action.type) {
    case ActionType.ADD_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };
    case ActionType.EDIT_ORDER_AMOUNT:
      const { token, amountFrom } = action.payload;
      const updatedOrders = state.orders.map((order) => {
        if (order.tokenFrom === token) {
          return { ...order, amountFrom };
        }
        return order;
      });
      return { ...state, orders: updatedOrders };
    case ActionType.SET_TARGET_TOKEN:
      return { ...state, targetToken: action.payload };
    case ActionType.DELETE_ORDER:
      const { tokenFrom } = action.payload;
      const filteredOrders = state.orders.filter(
        (order) => order.tokenFrom !== tokenFrom
      );
      const filteredOrderResults = state.ordersResults.filter(
        (order) => order.tokenFrom !== tokenFrom
      );
      return {
        ...state,
        orders: filteredOrders,
        ordersResults: filteredOrderResults,
      };
    case ActionType.OPEN_MODAL:
      return { ...state, openModal: true };
    case ActionType.CLOSE_MODAL:
      return { ...state, openModal: false };
    case ActionType.SET_CUSTOM_RECIPIENT:
      return { ...state, customRecipient: action.payload };
    case ActionType.TOGGLE_CUSTOM_RECIPIENT:
      return { ...state, isCustomRecipient: action.payload };
    case ActionType.CLEAR_ALL_ORDERS:
      return { ...state, orders: [], ordersResults: [] };
    case ActionType.ADD_ORDER_RESULT:
      // clear previous order result based on tokenFrom
      const { tokenFrom: tokenFromResult } = action.payload;
      const filteredOrderResults2 = state.ordersResults.filter(
        (order) => order.tokenFrom !== tokenFromResult
      );
      return {
        ...state,
        ordersResults: [...filteredOrderResults2, action.payload],
      };
    default:
      return state;
  }
}

// Create the store
const store = configureStore({
  reducer: reducer,
});

export default store;
