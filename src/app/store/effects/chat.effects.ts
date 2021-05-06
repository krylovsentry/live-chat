import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {NEW_CHAT_MESSAGE_ACTION_TO_SERVER, NewChatMessageActionToServer} from "../actions/chat.actions";
import {map, pluck} from "rxjs/operators";


@Injectable()
export class ChatEffects {

  constructor(
    private actions: Actions,
    private socket: Socket,
  ) {
  }


  @Effect({dispatch: false})
  newMessageToServer: Observable<void> = this.actions.pipe(
    ofType(NEW_CHAT_MESSAGE_ACTION_TO_SERVER),
    pluck("newMessage"),
    map((newMessage: string) => {
      this.socket.emit('new-message', newMessage);
    })
  )

}
