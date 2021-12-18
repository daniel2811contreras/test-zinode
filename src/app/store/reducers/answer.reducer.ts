import { createReducer, on } from "@ngrx/store";
import { setAnswer } from "../actions/anwer.action";
import { answerState } from "../initialStates/answer.state";

export const answerReducer = createReducer(answerState,
    on(setAnswer, (state, {answer}) =>({...state, ...answer})),
)