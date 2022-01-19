import {Component, OnInit} from '@angular/core';
import {Message} from "../models/message.model";
import {ChatService} from "../chat.service";
import {Store} from "@ngrx/store";
import {AppState} from "../store/state";
import {AddMessageAction, SendMessageAction} from "../store/actions/chat.actions";
import {Observable} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  messageList$: Observable<Message[]>;
  newMessage: string = "";

  constructor(
    private chatService: ChatService,
    private store: Store<AppState>
    ) {
  }

  ngOnInit() {
    this.messageList$ = this.chatService.getMessage();
  }

  sendMessage(): void {
    const addMessageAction = new AddMessageAction({
      message: this.newMessage
    });
    this.chatService.undoAction = addMessageAction;
    this.store.dispatch(addMessageAction);
    this.store.dispatch(new SendMessageAction({
      message: this.newMessage
    }));
  }
}
