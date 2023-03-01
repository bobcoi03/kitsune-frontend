import { configureStore } from "@reduxjs/toolkit";

// Define the state shape


// Define the actions
enum ActionType {
  ADD_ORDER = "ADD_ORDER",
  SET_TARGET_TOKEN =  "SET_TARGET_TOKEN",
}

interface AddOrderAction {
  type: ActionType.ADD_ORDER;
  payload: OrderToSwap;
}

interface SetTargetTokenAction {
  type: ActionType.SET_TARGET_TOKEN;
  payload: string;
}

type Action = AddOrderAction | SetTargetTokenAction;

// Define the reducer
const initialState: AppState = { orders: [], openModal: false, targetToken: 'ETH' };

// Define the reducer
function reducer(state: AppState = initialState, action: Action): AppState {
  switch (action.type) {
    case ActionType.ADD_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };
    case ActionType.SET_TARGET_TOKEN:
      return { ...state, targetToken: action.payload };
    default:
      return state;
  }
}


// Create the store
const store = configureStore({
  reducer: reducer,
});

export default store;
