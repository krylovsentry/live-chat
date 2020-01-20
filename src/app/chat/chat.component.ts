import {Component, OnInit} from '@angular/core';
import {Message} from "../models/message.model";
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  messageList: Message[] = [{message: "Hello", sentimentLevel: 0},];
  newMessage: string = "";

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.getMessage().subscribe((message) => {
      this.messageList.push(message);
    });
  }


  sendMessage(): void {
    this.chatService.sendMessage(this.newMessage);
  }

}
