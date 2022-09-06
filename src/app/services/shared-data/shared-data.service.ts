import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Match, User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public subject = new Subject<any>();
  public userLogged!: User;
  public match!: Match;

  private userSource = new BehaviorSubject(this.userLogged);
  currentMessageUser = this.userSource.asObservable();
  private matchSource = new BehaviorSubject(this.match);
  currentMessageMatch = this.matchSource.asObservable();

  constructor() { }

  changeMessageUser(value: User) {
    this.userSource.next(value);
  }
  changeMessageMatch(value: Match) {
    this.matchSource.next(value);
  }

}
