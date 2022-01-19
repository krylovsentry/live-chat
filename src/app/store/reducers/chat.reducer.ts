import {chatAdapter, ChatState, initialChatState} from "../chat.state";
import {ADD_MESSAGE, ADD_MESSAGES, ChatActions} from "../actions/chat.actions";


export const chatReducer = (state = initialChatState, action: ChatActions): ChatState => {
  switch (action.type) {
    case ADD_MESSAGE: {
      return chatAdapter.addOne(action.message, state);
    }

    case ADD_MESSAGES: {
      return chatAdapter.addAll(action.messages, state);
    }

    default: {
      return state;
    }
  }
}
