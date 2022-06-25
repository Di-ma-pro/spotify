import { MakeStore, Context } from "next-redux-wrapper";
import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction, applyMiddleware } from "redux";
import { reducer, RootState } from "./reducers/index";

const makeStore: MakeStore<RootState> = (context: Context) => createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper<RootState>(makeStore, {debug: true});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>