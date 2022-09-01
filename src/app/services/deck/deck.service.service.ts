import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Deck } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class DeckServiceService {

  readonly DECK_COLLECTION: string = 'deck';

  private deckCollections!: AngularFirestoreCollection<Deck>;
  items!: Observable<Deck[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.deckCollections = this.afs.collection<Deck>(this.DECK_COLLECTION);
  }

  getAllDecks(): Observable<Deck[]> {
    this.deckCollections = this.afs.collection<Deck>(this.DECK_COLLECTION);
    this.items = this.deckCollections.valueChanges({ idField: 'id' });
    return this.items;
  }

}
