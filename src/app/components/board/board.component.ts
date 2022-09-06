import { Component, OnInit } from '@angular/core';

import { SharedDataService } from 'src/app/services';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  userLogged: any;

  constructor(
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    //this.sharedDataService.currentMessage.subscribe(message => (this.selectedMessage = message));
    this.sharedDataService.currentMessageUser.subscribe(message => (this.userLogged = message));
    console.log("Test: ", this.userLogged)
  }

}
