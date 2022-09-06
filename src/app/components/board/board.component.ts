import { Component, OnInit } from '@angular/core';
import { Deck, Match } from 'src/app/models';

import { SharedDataService } from 'src/app/services';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  userLogged: any;
  match!: Match;
  decks: Deck[] = [];

  constructor(
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.sharedDataService.currentMessageUser.subscribe(message => (this.userLogged = message));
    this.sharedDataService.currentMessageMatch.subscribe(message => (this.match = message));
    console.log("Test1: ", this.userLogged)
    console.log("Test2: ", this.match)
    console.log("Test3: ", this.decks)
  }

}
