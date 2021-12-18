import { createReducer, on } from "@ngrx/store";
import { setCreditList } from "../actions/credit.action";
import { creditState } from "../initialStates/credit.state";

export const creditReducer = createReducer(creditState,
    on(setCreditList, (_, {creditList})=>([...creditList])))