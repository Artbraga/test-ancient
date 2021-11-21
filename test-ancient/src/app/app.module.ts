import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ListBoxesComponent } from './list-boxes/list-boxes.component';
import { BoxItemComponent } from './box-item/box-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailBoxComponent } from './detail-box/detail-box.component';
import { ToastsContainer } from './toasts/toasts.component';

@NgModule({
  declarations: [
    AppComponent,
    ListBoxesComponent,
    BoxItemComponent,
    DetailBoxComponent,
    ToastsContainer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
