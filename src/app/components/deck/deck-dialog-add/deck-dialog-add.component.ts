import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Deck } from 'src/app/models';
import { MyErrorStateMatcher } from '../../shared/errors/MyErrorStateMatcher';

@Component({
  selector: 'app-deck-dialog-add',
  templateUrl: './deck-dialog-add.component.html',
  styleUrls: ['./deck-dialog-add.component.scss']
})
export class DeckDialogAddComponent {

  deckForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<DeckDialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm(): void {
    this.deckForm = new FormGroup({
      id: new FormControl(this.data != null ? this.data.id : ''),
      nameDeck: new FormControl(this.data != null ? this.data.nameDeck : '', [Validators.required])
    });
  }

  onSubmit(): void {
    let deck: Deck;
    deck = {
      id: this.deckForm.controls['id'].value,
      nameDeck: this.deckForm.controls['nameDeck'].value,
      cards: []
    }
    this.dialogRef.close(deck);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
