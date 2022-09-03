import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { ToolBarServiceService } from 'src/app/services';

import firebase from 'firebase/compat/app';
import { environment as e } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private toolBarServiceService: ToolBarServiceService
  ) { }

  ngOnInit(): void {
    this.auth.authState.subscribe(authState => {
      if(authState) {
        this.router.navigate([e.REDIRECT_DASHBOARD]);
        this.toolBarServiceService.emitValueToolBar(true);
      }
    });
  }

  loginGoogle() {
    this.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider())
      .then(res => {
        this.router.navigate([e.REDIRECT_DASHBOARD]);
        this.toolBarServiceService.emitValueToolBar(true);
        window.location.reload();
      })
      .catch(err => {});
  }

}