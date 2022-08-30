import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

import { 
  BoardComponent,
  LoginComponent,
  NotAccessComponent
} from 'src/app/components/index';

const redirectUnauthorizedToInfo = () => redirectUnauthorizedTo(['notAcess']);
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'notAcess', component: NotAccessComponent },
  { path: 'board', component: BoardComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToInfo }  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
