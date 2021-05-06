import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from "../models/message.model";
import {ChatService} from "../chat.service";
import {take, takeUntil} from "rxjs/operators";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit, OnDestroy {

  destroySubject$: Subject<void> = new Subject<void>();
  messageList: Message[] = [{message: "Hello", sentimentLevel: 0},];
  newMessage: string = "";

  messageList$: Observable<Message[]>;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.handleSocketMessage();
    this.messageList$ = this.chatService.getMessagesFromStore$();
  }


  sendMessage(): void {
    this.chatService.sendMessage(this.newMessage);
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

}
