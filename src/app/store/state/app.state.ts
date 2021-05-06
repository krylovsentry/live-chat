import {createSelector} from "@ngrx/store";
import {Message} from "../../models/message.model";

interface ChatState {
  chatMessages: Message[];
  sentimentLevel: number;
}

interface UserState {
}

export interface AppState {
  chat: ChatState;
  users?: UserState;
}

export const initialChatState: ChatState = {
  chatMessages: [],
  sentimentLevel: 0
};

export const initialAppState: AppState = {
  chat: initialChatState
};


export const selectChatState = (state: AppState) => state.chat;

export const selectChatMessages = createSelector(selectChatState, (chatState: ChatState) => chatState.chatMessages);
export const selectSentimentLevel = createSelector(selectChatState, (chatState: ChatState) => chatState.sentimentLevel);

