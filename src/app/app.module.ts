import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import  {   BoardComponent, 
            LoginComponent, 
            NotAccessComponent,
            TollBarComponent,
            DashboardComponent,
            LookForMatchComponent,
            DeckComponent
        } 
from 'src/app/components/index';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

// Config
import { environment as e } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    LoginComponent,
    NotAccessComponent,
    TollBarComponent,
    DashboardComponent,
    LookForMatchComponent,
    DeckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(e.firebaseConfig),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSidenavModule
  ],
  providers: [
    { provide: USE_DEVICE_LANGUAGE, useValue: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
