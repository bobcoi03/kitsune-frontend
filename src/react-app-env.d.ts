/// <reference types="react-scripts" />

interface OrderToSwap {
    tokenFrom: string;
    amount: number;
}

interface AppState {
    orders: OrderToSwap[];
    openModal: boolean;
    targetToken: string;
  }