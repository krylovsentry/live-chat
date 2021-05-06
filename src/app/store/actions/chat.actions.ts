import {Action} from "@ngrx/store";
import {Message} from "../../models/message.model";


export const NEW_CHAT_MESSAGE_ACTION_TO_SERVER = "[Chat] New Chat Message To Server";
export const ADD_MESSAGES_TO_CHAT = "[Chat] Add Messages To Chat";

export class NewChatMessageActionToServer implements Action {
  readonly type = NEW_CHAT_MESSAGE_ACTION_TO_SERVER;

  constructor(public newMessage: string) {
  }
}

export class AddMessagesToChat implements Action {
  readonly type = ADD_MESSAGES_TO_CHAT;

  constructor(public message: Message) {
  }
}


export type ChatActions = AddMessagesToChat | NewChatMessageActionToServer;
