import { createReducer, on } from "@ngrx/store";
import { setBalance } from "../actions/balance.action";
import { balanceState } from "../initialStates/balance.state";

export const balanceReducer = createReducer(balanceState,
    on(setBalance, (state, {balance}) => ({...state, ...balance})))