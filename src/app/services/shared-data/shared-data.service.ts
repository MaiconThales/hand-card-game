import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public subject = new Subject<any>();
  public userLogged!: User;

  private userSource = new BehaviorSubject(this.userLogged);
  currentMessageUser = this.userSource.asObservable();

  constructor() { }

  changeMessageUser(value: User) {
    this.userSource.next(value);
  }

}
