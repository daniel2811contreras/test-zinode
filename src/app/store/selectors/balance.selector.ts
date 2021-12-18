import { createSelector } from "@ngrx/store";
import { IBalance } from "src/app/models/balance.model";
import { AppState } from "../app.state";

export const getState = (state: AppState) => state.balance

export const selectBalance = createSelector(getState, (state: IBalance)=> state)