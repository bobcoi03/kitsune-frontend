export interface AppState {
    orders: OrderToSwap[];
    openModal: boolean;
    targetToken: string;
    customRecipient: string,
    isCustomRecipient: boolean,
  }

export enum ActionType {
    ADD_ORDER = "ADD_ORDER",
    EDIT_ORDER_AMOUNT = "EDIT_ORDER_AMOUNT",
    SET_TARGET_TOKEN = "SET_TARGET_TOKEN",
    DELETE_ORDER = "DELETE_ORDER",
    OPEN_MODAL = "OPEN_MODAL",
    CLOSE_MODAL = "CLOSE_MODAL",
    SET_CUSTOM_RECIPIENT = "SET_CUSTOM_RECIPIENT",
    TOGGLE_CUSTOM_RECIPIENT = "TOGGLE_CUSTOM_RECIPIENT",
    CLEAR_ALL_ORDERS = "CLEAR_ALL_ORDERS"
  }


interface OrderToSwap {
    tokenFrom: string;
    amount: number;
  }
  
  interface EditOrderAmountPayload {
    token: string;
    amount: number;
  }
  
  export interface AppState {
    orders: OrderToSwap[];
    openModal: boolean;
    targetToken: string;
    customRecipient: string,
    isCustomRecipient: boolean,
  }
  
  // Define the actions
  
  
 export interface AddOrderAction {
    type: ActionType.ADD_ORDER;
    payload: OrderToSwap;
  }
  
 export interface EditOrderAmountAction {
    type: ActionType.EDIT_ORDER_AMOUNT;
    payload: EditOrderAmountPayload;
  }
  
 export interface DeleteOrderAction {
    type: ActionType.DELETE_ORDER;
    payload: { tokenFrom: string };
  }
  
 export interface SetTargetTokenAction {
    type: ActionType.SET_TARGET_TOKEN;
    payload: string;
  }
  
 export interface SetCustomRecipientAction {
    type: ActionType.SET_CUSTOM_RECIPIENT;
    payload: string;
  }
  
export  interface ToggleCustomRecipientAction {
    type: ActionType.TOGGLE_CUSTOM_RECIPIENT;
    payload: boolean;
  }

  export interface OpenModalAction {
    type: ActionType.OPEN_MODAL
  }

  export interface CloseModalAction {
    type: ActionType.CLOSE_MODAL
  }
  
  export interface ClearAllOrdersAction {
    type: ActionType.CLEAR_ALL_ORDERS
  }

 export type Action =
    | AddOrderAction
    | EditOrderAmountAction
    | SetTargetTokenAction
    | DeleteOrderAction
    | OpenModalAction
    | CloseModalAction
    | SetCustomRecipientAction
    | ToggleCustomRecipientAction
    | ClearAllOrdersAction
  
  