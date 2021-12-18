import { createAction, props } from "@ngrx/store"
import { IRequest } from "src/app/models/request.model"

export const SET_REQUEST = "[REQUEST] set state"

export const setRequest = createAction(SET_REQUEST,props<{request: IRequest}>())
