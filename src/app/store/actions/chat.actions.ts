import {Action} from "@ngrx/store";
import {Message} from "../../models/message.model";

export const SEND_MESSAGE = "[CHAT]SEND_MESSAGE"
export const ADD_MESSAGE = "[CHAT]ADD_MESSAGE"
export const ADD_MESSAGES = "[CHAT]ADD_MESSAGES"

export class SendMessageAction implements Action {
  public readonly type = SEND_MESSAGE;

  constructor(public message: Message) {
  }
}

export class AddMessageAction implements Action {
  public readonly type = ADD_MESSAGE;

  constructor(public message: Message) {
  }
}

export class AddMessagesAction implements Action {
  public readonly type = ADD_MESSAGES;

  constructor(public messages: Message[]) {
  }
}

export type ChatActions = AddMessageAction | SendMessageAction | AddMessagesAction;
