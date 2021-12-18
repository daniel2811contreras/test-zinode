import { createAction, props } from "@ngrx/store"
import { IAnswer } from "src/app/models/answer.model"

export const SET_ANSWER = "[ANSWER] set state"

export const setAnswer = createAction(SET_ANSWER,props<{answer: IAnswer}>())
