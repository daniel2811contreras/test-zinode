import { createSelector } from "@ngrx/store";
import { IRequest } from "src/app/models/request.model";
import { AppState } from "../app.state";

export const getState = (state:AppState) => state.request

export const selectRequest = createSelector(getState,(state: IRequest) => state)