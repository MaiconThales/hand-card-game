import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deck-dialog-add',
  templateUrl: './deck-dialog-add.component.html',
  styleUrls: ['./deck-dialog-add.component.scss']
})
export class DeckDialogAddComponent {

  constructor(
    public dialogRef: MatDialogRef<DeckDialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
