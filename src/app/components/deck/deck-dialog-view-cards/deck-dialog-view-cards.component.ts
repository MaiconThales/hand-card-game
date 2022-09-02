import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card, Deck } from 'src/app/models';

@Component({
  selector: 'app-deck-dialog-view-cards',
  templateUrl: './deck-dialog-view-cards.component.html',
  styleUrls: ['./deck-dialog-view-cards.component.scss']
})
export class DeckDialogViewCardsComponent {

  cards: Card[] = [];
  deck!: Deck;

  constructor(
    public dialogRef: MatDialogRef<DeckDialogViewCardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.insertCardsInView();
  }

  insertCardsInView(): void {
    this.deck = this.data;
  }

  editCard(indexElement: number): void {
    this.dialogRef.close(indexElement);
  }

  removeCard(indexElement: number): void {
    this.deck.cards.splice(indexElement, 1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
