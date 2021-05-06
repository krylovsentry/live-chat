import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";
import {Message} from "./models/message.model";
import {Store} from "@ngrx/store";
import {AppState, selectChatMessages} from "./store/state/app.state";
import {AddMessagesToChat, NewChatMessageActionToServer} from "./store/actions/chat.actions";

@Injectable({
  providedIn: 'root'
})
export class ChatService{

  constructor(
    private socket: Socket,
    private store$: Store<AppState>
  ) {
  }

  public getMessagesFromStore$(): Observable<Message[]> {
    return this.store$.select(selectChatMessages);
  }

  public handleSocketMessage(): void {
    // TODO: not good solution to make subsctiption in service
    this.socket.on('new-message', (message: Message) => {
      this.store$.dispatch(new AddMessagesToChat(message));
    });
  }


  public sendMessage(message: string): void {
    this.store$.dispatch(new NewChatMessageActionToServer(message));
  }

}
