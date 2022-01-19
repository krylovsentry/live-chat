import {AppState} from "../state";
import {createSelector} from "@ngrx/store";
import {chatAdapter, ChatState} from "../chat.state";


export const {
  selectAll
} = chatAdapter.getSelectors();

const selectChatState = (state: AppState) => state.chat;

export const selectMessages = createSelector(
  selectChatState,
  selectAll
);
