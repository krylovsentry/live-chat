import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";
import {Message} from "./models/message.model";
import {Store} from "@ngrx/store";
import {AppState} from "./store/state";
import {AddMessageAction} from "./store/actions/chat.actions";
import {selectMessages} from "./store/selectors/chat.selectors";
import {undo} from "./store/metareducer/undo";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public undoAction;

  constructor(
    private socket: Socket,
    private store: Store<AppState>
  ) {
    this.socket.on('new-message', (message: Message) => {
      if (message.sentimentLevel < 0) {
        this.store.dispatch(undo(this.undoAction));
      }
    });
  }


  public getMessage(): Observable<Message[]> {
    return this.store.select(selectMessages);
  }

  public sendMessage(message: string): void {
    this.socket.emit('new-message', message);
  }
}
