import {Message} from "../models/message.model";
import {createEntityAdapter, EntityState} from "@ngrx/entity";


export interface ChatState extends EntityState<Message>{
  config?: {}
}

export const chatAdapter = createEntityAdapter<Message>({
  selectId: item => item.message
});

export const initialChatState: ChatState = chatAdapter.getInitialState();
