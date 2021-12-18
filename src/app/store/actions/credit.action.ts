import { createAction, props } from "@ngrx/store"
import { ICredit } from "src/app/models/credit.model"

export const SET_CREDIT_LIST = "[CREDIT] set credit, loader list"

export const setCreditList = createAction(SET_CREDIT_LIST, props<{creditList: ICredit[]}>())