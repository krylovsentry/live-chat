import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../state";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {SEND_MESSAGE, SendMessageAction} from "../actions/chat.actions";
import {map, pluck} from "rxjs/operators";
import {Message} from "../../models/message.model";
import {ChatService} from "../../chat.service";


@Injectable()
export class ChatEffects {

  @Effect({dispatch: false})
  sendMessage$ = this.actions$.pipe(
    ofType(SEND_MESSAGE),
    pluck("message"),
    map((message: Message) => {
      this.chatService.sendMessage(message.message);
    })
  )

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private chatService: ChatService
  ) {
  }

}
