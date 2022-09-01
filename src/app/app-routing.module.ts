import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

import { 
  BoardComponent,
  LoginComponent,
  NotAccessComponent,
  DashboardComponent,
  DeckComponent
} from 'src/app/components/index';

const redirectUnauthorizedToInfo = () => redirectUnauthorizedTo(['notAcess']);
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'notAcess', component: NotAccessComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToInfo }  },
  { path: 'board', component: BoardComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToInfo }  },
  { path: 'deck', component: DeckComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToInfo }  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
