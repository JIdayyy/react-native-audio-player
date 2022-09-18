import { combineReducers } from "redux";
import { store } from "./store";
import player from "./slices/player";
import songList from "./slices/songlist";
import songPosition from "./slices/songPosition";
import user from "./slices/user";

const rootReducer = combineReducers({ player, songList, songPosition, user });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
