import { Injectable } from '@angular/core';

import { User } from 'src/app/models';

const USER_INFO = 'user-info';

@Injectable({
  providedIn: 'root'
})
export class InfoStorageService {

  constructor() { }

  public getToken(): any {
    const user = window.sessionStorage.getItem(USER_INFO);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveToken(userInfo: User): void {
    window.sessionStorage.removeItem(USER_INFO);
    window.sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo));
  }

  public signOut(): void {
    window.sessionStorage.clear();
  }

}
