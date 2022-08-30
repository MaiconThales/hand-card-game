import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { ToolBarServiceService } from 'src/app/services';

import { environment as e } from 'src/environments/environment.prod';

@Component({
  selector: 'app-toll-bar',
  templateUrl: './toll-bar.component.html',
  styleUrls: ['./toll-bar.component.scss']
})
export class TollBarComponent implements OnInit {

  showToolBar: boolean = false;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private toolBarServiceService: ToolBarServiceService
  ) { }

  ngOnInit(): void {
    this.toolBarServiceService.showToolBar.subscribe(show => {
      this.showToolBar = show;
    });
  }

  logout() {
    this.auth.signOut();
    this.toolBarServiceService.emitValueToolBar(false);
    this.router.navigate([e.REDIRECT_LOGIN]);
  }

}
