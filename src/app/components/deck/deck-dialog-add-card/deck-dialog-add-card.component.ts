import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MyErrorStateMatcher } from '../../shared/errors/MyErrorStateMatcher';
import { Card, Deck } from 'src/app/models';

@Component({
  selector: 'app-deck-dialog-add-card',
  templateUrl: './deck-dialog-add-card.component.html',
  styleUrls: ['./deck-dialog-add-card.component.scss']
})
export class DeckDialogAddCardComponent {

  cardForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<DeckDialogAddCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm(): void {
    if (this.data.indexCard != undefined) { //Edit
      this.cardForm = new FormGroup({
        id: new FormControl(this.data.deck.cards[this.data.indexCard].id),
        nameCard: new FormControl(this.data.deck.cards[this.data.indexCard].nameCard, [Validators.required]),
        damage: new FormControl(this.data.deck.cards[this.data.indexCard].damage, [Validators.required]),
        life: new FormControl(this.data.deck.cards[this.data.indexCard].life, [Validators.required]),
        image: new FormControl(this.data.deck.cards[this.data.indexCard].image)
      });
    } else { //Add
      this.cardForm = new FormGroup({
        id: new FormControl(this.data != null ? this.data.deck.id : ''),
        nameCard: new FormControl(this.data != null ? this.data.deck.nameCard : '', [Validators.required]),
        damage: new FormControl(this.data != null ? this.data.deck.damage : undefined, [Validators.required]),
        life: new FormControl(this.data != null ? this.data.deck.life : undefined, [Validators.required]),
        image: new FormControl(this.data != null ? this.data.deck.image : '')
      });
    }
  }

  onSubmit(): void {
    let card: Card;
    card = {
      id: this.cardForm.controls['id'].value,
      nameCard: this.cardForm.controls['nameCard'].value,
      damage: this.cardForm.controls['damage'].value,
      life: this.cardForm.controls['life'].value,
      image: ''
    }
    this.dialogRef.close(card);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
