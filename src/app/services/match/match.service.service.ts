import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatestWith, map, Observable } from 'rxjs';

import { Match } from 'src/app/models/match/Match';

@Injectable({
  providedIn: 'root'
})
export class MatchServiceService {

  readonly MATCH_COLLECTION: string = 'match';
  readonly DURATION_MESSAGE: any = { duration: 5000 };

  private matchCollections!: AngularFirestoreCollection<Match>;
  items!: Observable<Match[]>;

  constructor(
    private afs: AngularFirestore,
    private matSnackBar: MatSnackBar
  ) {
    this.matchCollections = this.afs.collection<Match>(this.MATCH_COLLECTION);
  }

  getAllMatchAvailable(): Observable<Match[]> {
    this.matchCollections = this.afs.collection<Match>(this.MATCH_COLLECTION, ref => ref.where('isAvailable', '==', true));
    this.items = this.matchCollections.valueChanges({ idField: 'id' });
    return this.items;
  }

  getMatchByUser1(uid: string): Observable<Match[]> {
    this.matchCollections = this.afs.collection<Match>(this.MATCH_COLLECTION, ref => ref.where('user1.uid', '==', uid)
      .where('isFinish', '==', false)
      .where('isAvailable', '==', false));
    this.items = this.matchCollections.valueChanges({ idField: 'id' });
    return this.items;
  }

  getMatchByUser2(uid: string): Observable<Match[]> {
    this.matchCollections = this.afs.collection<Match>(this.MATCH_COLLECTION, ref => ref.where('user2.uid', '==', uid)
      .where('isFinish', '==', false)
      .where('isAvailable', '==', false));
    this.items = this.matchCollections.valueChanges({ idField: 'id' });
    return this.items;
  }

  addMatchFirebase(match: Match): void {
    this.matchCollections.add(match)
      .then(() => { })
      .catch(err => {
        this.matSnackBar.open(
          'Error add',
          'Erro', this.DURATION_MESSAGE
        );
        console.log("Error: ", err);
      });
  }

  deleteMatchFirebase(documentId: string): void {
    this.afs.doc<Match>(`${this.MATCH_COLLECTION}/${documentId}`)
      .delete()
      .then(res => { })
      .catch(err => {
        this.matSnackBar.open(
          'Error delete',
          'Erro', this.DURATION_MESSAGE
        );
        console.log("Error: ", err);
      });
  }

  updateMatchFirebase(match: Match): void {
    this.afs.doc<Match>(`${this.MATCH_COLLECTION}/${match.id}`)
      .update(match)
      .then(res => { })
      .catch(err => {
        this.matSnackBar.open(
          "Error update",
          'Erro', this.DURATION_MESSAGE
        )
      });
  }

}