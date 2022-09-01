import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';

import { ToolBarServiceService } from 'src/app/services';

import { User } from 'src/app/models';

import { environment as e } from 'src/environments/environment.prod';

@Component({
  selector: 'app-toll-bar',
  templateUrl: './toll-bar.component.html',
  styleUrls: ['./toll-bar.component.scss']
})
export class TollBarComponent implements OnInit {

  showToolBar: boolean = false;
  userLogged!: User;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private toolBarServiceService: ToolBarServiceService
  ) { }

  ngOnInit(): void {
    this.instanceObj();
    this.isLoggedIn().pipe(
      tap(user => {
        if (user) {
          this.toolBarServiceService.emitValueToolBar(true);
          this.userLogged.uid = user.uid;
          this.userLogged.email = user.email == null ? "Undefined" : user.email;
        }
      })
    ).subscribe();
    this.toolBarServiceService.showToolBar.subscribe(show => {
      this.showToolBar = show;
    });
  }

  instanceObj(): void {
    this.userLogged = {
      id: "",
      uid: "",
      email: ""
    };
  }

  isLoggedIn() {
    return this.auth.authState.pipe(first());
  }

  logout(): void {
    this.auth.signOut();
    this.toolBarServiceService.emitValueToolBar(false);
    this.router.navigate([e.REDIRECT_LOGIN]);
  }

  redirectToDashboard(): void {
    this.router.navigate([e.REDIRECT_DASHBOARD]);
  }

  redirectToMenu(value: number): void {
    switch (value) {
      case 1:
        this.router.navigate([e.REDIRECT_DECK]);
        break;
      default:
        this.router.navigate([e.REDIRECT_DASHBOARD]);
        break;
    }
  }

}
