import { createSelector } from "@ngrx/store";
import { ICredit } from "src/app/models/credit.model";
import { AppState } from "../app.state";

export const getState = (state:AppState) => state.creditList

export const selectCreditList = createSelector(getState,(state: ICredit[])=> state)