import { combineReducers } from "redux";

import player from "./slices/player";
import songList from "./slices/songlist";
import songPosition from "./slices/songPosition";

import { store } from "./store";

const rootReducer = combineReducers({ player, songList, songPosition });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
