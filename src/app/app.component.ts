import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./store/state";
import {AddMessagesAction} from "./store/actions/chat.actions";
import {fromEvent} from "rxjs";
import {take, withLatestFrom} from "rxjs/operators";
import {selectMessages} from "./store/selectors/chat.selectors";
import {Message} from "./models/message.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'live-chat';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    const messages = JSON.parse(window.localStorage.getItem('messages'));
    if (messages) {
      this.store.dispatch(new AddMessagesAction(messages));
    }

    fromEvent(window, 'beforeunload').pipe(
      withLatestFrom(this.store.select(selectMessages)),
      take(1)
    ).subscribe(([_, messages]: [Event, Message[]]) => {
      window.localStorage.setItem('messages', JSON.stringify(messages));
    })
  }

}
