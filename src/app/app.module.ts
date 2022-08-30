import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import  {   BoardComponent, 
            LoginComponent, 
            NotAccessComponent 
        } 
from 'src/app/components/index';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';

// Config
import { environment as e } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    LoginComponent,
    NotAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(e.firebaseConfig),
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: USE_DEVICE_LANGUAGE, useValue: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
