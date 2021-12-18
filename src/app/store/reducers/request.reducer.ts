import { createReducer, on } from "@ngrx/store";
import { setRequest } from "../actions/request.action";
import { requetsState } from "../initialStates/request.state";

export const requestReducer = createReducer(requetsState,
    on(setRequest, (state, {request}) =>({...state, ...request})),
)