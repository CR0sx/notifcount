import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { StatusesComponent } from './statuses/statuses.component';
import { StatusesService } from './statuses/statuses.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StatusesComponent
  ],
  imports: [
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [StatusesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
