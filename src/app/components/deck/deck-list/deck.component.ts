import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { DeckServiceService } from 'src/app/services';
import { Deck } from 'src/app/models';
import { DeckDialogAddComponent } from '../deck-dialog-add';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['name', 'options'];
  dataSource!: MatTableDataSource<Deck>;
  decks: Deck[] = [];

  constructor(
    private deckServiceService: DeckServiceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getDecks();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDecks(): void {
    this.deckServiceService.getAllDecks().subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.decks = data;
      },
      error: err => {}
    });
  }

  openDialogRegister(type: number, object: any): void {
    const dialogRef = this.dialog.open(DeckDialogAddComponent, {
      width: '500px',
      height: '180px',
      data: object
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        switch (type) {
          case 1:
            this.deckServiceService.addDeckFirebase(result);
            break;
          case 2:
            this.deckServiceService.updateDeckFirebase(result);
            break;
        }
      }
    });
  }

  deleteDeck(documentId: string): void {
    this.deckServiceService.deleteDeckFirebase(documentId);
  }

}