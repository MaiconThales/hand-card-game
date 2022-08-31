import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';

import {
  ToolBarServiceService,
  MatchServiceService
} from 'src/app/services';

import { User, UserToSave } from 'src/app/models';

import { environment as e } from 'src/environments/environment.prod';
import { Match } from 'src/app/models/match/Match';

@Component({
  selector: 'app-toll-bar',
  templateUrl: './toll-bar.component.html',
  styleUrls: ['./toll-bar.component.scss']
})
export class TollBarComponent implements OnInit {

  showToolBar: boolean = false;
  isLookForMatch: boolean = false;
  isDisabledBtnSearcMatch: boolean = false;

  userLogged!: User;
  usersLookForMatch: User[] = [];
  matchServersAvailable: Match[] = [];
  match!: Match;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private toolBarServiceService: ToolBarServiceService,
    private matchServiceService: MatchServiceService
  ) { }

  ngOnInit(): void {
    this.instanceObj();
    this.isLoggedIn().pipe(
      tap(user => {
        if (user) {
          this.toolBarServiceService.emitValueToolBar(true);
          this.userLogged.uid = user.uid;
          this.userLogged.email = user.email == null ? "Undefined" : user.email;
          this.getListMatch();
        }
      })
    ).subscribe();
    this.toolBarServiceService.showToolBar.subscribe(show => {
      this.showToolBar = show;
    });
  }

  logout(): void {
    this.auth.signOut();
    this.toolBarServiceService.emitValueToolBar(false);
    this.router.navigate([e.REDIRECT_LOGIN]);
  }

  isLoggedIn() {
    return this.auth.authState.pipe(first());
  }

  instanceObj(): void {
    this.userLogged = {
      id: "",
      uid: "",
      email: ""
    };

    this.match = {
      id: "",
      isAvailable: true,
      isWaitPlayer2: true,
      isFinish: false,
      user1: {
        uid: "",
        email: ""
      },
      user2: {
        uid: "",
        email: ""
      },
    };
  }

  getNumberRandom(maxPosition: number): number {
    return Math.floor(maxPosition);
  }

  getListMatch(): void {
    this.matchServiceService.getMatchByUser1(this.userLogged.uid).subscribe({
      next: dataUser1 => {
        if(dataUser1.length == 0) {
          this.matchServiceService.getMatchByUser2(this.userLogged.uid).subscribe({
            next: dataUser2 => {
              if(dataUser2.length == 0) {
                this.matchServiceService.getAllMatchAvailable().subscribe({
                  next: data => {
                    this.matchServersAvailable = data;
                  },
                  error: err => {}
                });
              } else {
                this.isLookForMatch = false;
                this.isDisabledBtnSearcMatch = true;
                this.router.navigate([e.REDIRECT_BOARD]);
              }
            },
            error: err => {}
          });
        } else {
          this.isLookForMatch = false;
          this.isDisabledBtnSearcMatch = true;
          this.router.navigate([e.REDIRECT_BOARD]);
        }
      },
      error: err => {}
    });
  }

  lookForMatch(): void {
    this.isLookForMatch = true;
    this.isDisabledBtnSearcMatch = true;
    if(this.matchServersAvailable.length == 0) {
      this.match.user1 = this.userLogged;
      this.matchServiceService.addMatchFirebase(this.match);
    } else {
      let position = this.getNumberRandom(this.matchServersAvailable.length - 1);
      let match = this.matchServersAvailable[position];
      match.isAvailable = false;
      match.user2 = this.userLogged;
      this.matchServiceService.updateMatchFirebase(match);
    }
  }

  cancelLookForMatch(): void {
    this.isLookForMatch = false;
    this.isDisabledBtnSearcMatch = false;
    let findUser1;
    let findUser2;

    findUser1 = this.matchServersAvailable.find(e1 => {
      return e1.user1.uid == this.userLogged.uid
    });
    if(findUser1 == undefined) {
      findUser2 = this.matchServersAvailable.find(e2 => {
        if(e2.user2 != undefined) {
          return e2.user2.uid == this.userLogged.uid
        }
        return undefined;
      });
      if(findUser2 != undefined) {
        this.matchServiceService.deleteMatchFirebase(findUser2.id);
      }
    } else {
      this.matchServiceService.deleteMatchFirebase(findUser1.id);
    }
  }

}
