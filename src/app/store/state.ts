import {ChatState, initialChatState} from "./chat.state";
import {ActionReducerMap} from "@ngrx/store";
import {chatReducer} from "./reducers/chat.reducer";


export interface AppState {
  chat: ChatState,
  sidebar?: {},
  config?: {},
  user?: {}
}

export const appReducers: ActionReducerMap<AppState> = {
  chat: chatReducer
}

export const initialAppState: AppState = {
  chat: initialChatState
}

export function getInitialState(): AppState {
  return initialAppState;
}
