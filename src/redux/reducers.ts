import { combineReducers } from "redux";

import player from "./slices/player";

import { store } from "./store";

const rootReducer = combineReducers({ player });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
