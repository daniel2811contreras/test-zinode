import { createAction, props } from "@ngrx/store"
import { IBalance } from "src/app/models/balance.model"

export const SET_BALANCE = "[BALANCE] set state"

export const setBalance = createAction(SET_BALANCE, props<{balance: IBalance}>())
