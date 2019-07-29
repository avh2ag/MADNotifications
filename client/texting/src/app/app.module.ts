import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextViewComponent } from './text-view/text-view.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {
  OKTA_CONFIG,
  OktaAuthModule
} from '@okta/okta-angular';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TextViewComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    OktaAuthModule.initAuth(environment.oktaConfig)
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: environment.oktaConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
