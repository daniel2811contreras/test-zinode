import { createSelector } from "@ngrx/store";
import { IAnswer } from "src/app/models/answer.model";
import { AppState } from "../app.state";

export const getState = (state:AppState) => state.answer

export const selectAnswer = createSelector(getState,(state: IAnswer) => state)