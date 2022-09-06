import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { MatchServiceService, SharedDataService } from 'src/app/services';

import { User, Match } from 'src/app/models';

import { environment as e } from 'src/environments/environment.prod';

@Component({
  selector: 'app-look-for-match',
  templateUrl: './look-for-match.component.html',
  styleUrls: ['./look-for-match.component.scss']
})
export class LookForMatchComponent implements OnInit {
  @Input() infoUser!: User;

  isLookForMatch: boolean = false;
  isDisabledBtnSearcMatch!: boolean;

  usersLookForMatch: User[] = [];
  matchServersAvailable: Match[] = [];
  match!: Match;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private matchServiceService: MatchServiceService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.instanceObj();
    this.getListMatch();
  }

  instanceObj(): void {
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
    maxPosition = maxPosition - 1;
    return Math.floor(Math.random() * maxPosition);
  }

  getListMatch(): void {
    this.getMatchByUser1();
  }

  getMatchByUser1(): void {
    this.matchServiceService.getMatchByUser1(this.infoUser.uid).subscribe({
      next: dataUser1 => {
        if (dataUser1.length == 0) {
          this.getMatchByUser2();
        } else {
          this.sharedDataService.changeMessageMatch(dataUser1[0]);
          this.isLookForMatch = false;
          this.router.navigate([e.REDIRECT_BOARD]);
        }
      },
      error: err => { }
    });
  }

  getMatchByUser2(): void {
    this.matchServiceService.getMatchByUser2(this.infoUser.uid).subscribe({
      next: dataUser2 => {
        if (dataUser2.length == 0) {
          this.getAllMatchAvailable();
        } else {
          this.sharedDataService.changeMessageMatch(dataUser2[0]);
          this.isLookForMatch = false;
          this.router.navigate([e.REDIRECT_BOARD]);
        }
      },
      error: err => { }
    });
  }

  getAllMatchAvailable(): void {
    this.matchServiceService.getAllMatchAvailable().subscribe({
      next: data => {
        this.matchServersAvailable = data;
      },
      error: err => { }
    });
  }

  lookForMatch(): void {
    this.isLookForMatch = true;
    this.isDisabledBtnSearcMatch = true;
    if (this.matchServersAvailable.length == 0) {
      this.match.user1 = this.infoUser;
      this.matchServiceService.addMatchFirebase(this.match);
    } else {
      let position = this.getNumberRandom(this.matchServersAvailable.length);
      let match = this.matchServersAvailable[position];
      match.isAvailable = false;
      match.user2 = this.infoUser;
      this.matchServiceService.updateMatchFirebase(match);
    }
  }

  cancelLookForMatch(): void {
    this.isLookForMatch = false;
    this.isDisabledBtnSearcMatch = false;
    let findUser1;
    let findUser2;

    findUser1 = this.matchServersAvailable.find(e1 => {
      return e1.user1.uid == this.infoUser.uid
    });
    if (findUser1 == undefined) {
      findUser2 = this.matchServersAvailable.find(e2 => {
        if (e2.user2 != undefined) {
          return e2.user2.uid == this.infoUser.uid
        }
        return undefined;
      });
      if (findUser2 != undefined) {
        this.matchServiceService.deleteMatchFirebase(findUser2.id);
      }
    } else {
      this.matchServiceService.deleteMatchFirebase(findUser1.id);
    }
  }

}
