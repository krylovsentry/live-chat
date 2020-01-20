import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";
import {Message} from "./models/message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
  }


  public getMessage(): Observable<Message> {
    return new Observable((observer) => {
      this.socket.on('new-message', (message: Message) => {
        observer.next(message);
      });
    });
  }

  public sendMessage(message: string): void {
    this.socket.emit('new-message', message);
  }
}
