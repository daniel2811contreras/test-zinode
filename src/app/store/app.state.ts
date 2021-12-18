import { ActionReducerMap } from "@ngrx/store";
import { IAnswer } from "../models/answer.model";
import { IBalance } from "../models/balance.model";
import { ICredit } from "../models/credit.model";
import { IRequest } from "../models/request.model";
import { answerReducer } from "./reducers/answer.reducer";
import { balanceReducer } from "./reducers/balance.reducer";
import { creditReducer } from "./reducers/credit.reducer";
import { requestReducer } from "./reducers/request.reducer";

export interface AppState {
    request: IRequest,
    answer: IAnswer,
    balance: IBalance,
    creditList: ICredit[]
}

export const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    request: requestReducer,
    answer: answerReducer,
    balance: balanceReducer,
    creditList: creditReducer
}