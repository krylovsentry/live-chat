import {initialChatState} from "../state/app.state";
import {ADD_MESSAGES_TO_CHAT, ChatActions} from "../actions/chat.actions";

export const chatReducer = (state = initialChatState, action: ChatActions) => {
  switch (action.type) {
    case ADD_MESSAGES_TO_CHAT: {
      return {
        ...state,
        chatMessages: state.chatMessages.concat(action.message)
      }
    }
    default: {
      return state;
    }
  }
}
