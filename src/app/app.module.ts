import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatComponent} from './chat/chat.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {FormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {appReducers} from "./store/state";
import {EffectsModule} from "@ngrx/effects";
import {ChatEffects} from "./store/effects/chat.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {handleUndo} from "./store/metareducer/undo";

const config: SocketIoConfig = {url: 'http://localhost:8080', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers, {
      metaReducers: [handleUndo]
    }),
    EffectsModule.forRoot([ChatEffects]),
    StoreDevtoolsModule.instrument(),
    SocketIoModule.forRoot(config),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
