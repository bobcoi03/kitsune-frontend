/// <reference types="react-scripts" />

interface OrderToSwap {
  tokenFrom: string;
  amount: number;
}

interface EditOrderAmountPayload {
  token: string;
  amount: number;
}

interface AppState {
  orders: OrderToSwap[];
  openModal: boolean;
  targetToken: string;
}

// Define the actions
enum ActionType {
  ADD_ORDER = "ADD_ORDER",
  EDIT_ORDER_AMOUNT = "EDIT_ORDER_AMOUNT",
  SET_TARGET_TOKEN = "SET_TARGET_TOKEN",
  DELETE_ORDER = "DELETE_ORDER",
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}

interface AddOrderAction {
  type: ActionType.ADD_ORDER;
  payload: OrderToSwap;
}

interface EditOrderAmountAction {
  type: ActionType.EDIT_ORDER_AMOUNT;
  payload: EditOrderAmountPayload;
}

interface DeleteOrderAction {
  type: ActionType.DELETE_ORDER;
  payload: { tokenFrom: string };
}

interface SetTargetTokenAction {
  type: ActionType.SET_TARGET_TOKEN;
  payload: string;
}

type Action =
  | AddOrderAction
  | EditOrderAmountAction
  | SetTargetTokenAction
  | DeleteOrderAction
  | OpenModalAction
  | CloseModalAction;
