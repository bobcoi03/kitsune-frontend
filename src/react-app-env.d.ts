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
  customRecipient: string,
  isCustomRecipient: boolean,
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

interface SetCustomRecipientAction {
  type: ActionType.SET_CUSTOM_RECIPIENT;
  payload: string;
}

interface ToggleCustomRecipientAction {
  type: ActionType.TOGGLE_CUSTOM_RECIPIENT;
  payload: boolean;
}

type Action =
  | AddOrderAction
  | EditOrderAmountAction
  | SetTargetTokenAction
  | DeleteOrderAction
  | OpenModalAction
  | CloseModalAction
  | SetCustomRecipientAction
  | ToggleCustomRecipientAction;

