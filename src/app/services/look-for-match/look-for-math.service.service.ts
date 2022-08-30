import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class LookForMathServiceService {

  readonly LOOK_FOR_MATCH_COLLECTION: string = 'look_for_match';
  readonly DURATION_MESSAGE: any = { duration: 5000 };

  private lookForMatchCollections!: AngularFirestoreCollection<User>;
  items!: Observable<User[]>;

  constructor(
    private afs: AngularFirestore,
    private matSnackBar: MatSnackBar
  ) {
    this.lookForMatchCollections = this.afs.collection<User>(this.LOOK_FOR_MATCH_COLLECTION);
  }

  addLookForMatchFirebase(user: User): void {
    this.lookForMatchCollections.add(user)
      .then(() => {
        this.matSnackBar.open(
          'Procurando partida',
          'Ok', this.DURATION_MESSAGE
        );
      })
      .catch(err => {
        this.matSnackBar.open(
          'Erro ao procurar partida',
          'Erro', this.DURATION_MESSAGE
        );
        console.log("Error: ", err);
      });
  }

  getLookForMatchByUserFirebase(uid: string): Observable<User[]> {
    this.lookForMatchCollections = this.afs.collection<User>(this.LOOK_FOR_MATCH_COLLECTION, ref => ref.where('uid', '==', uid));
    this.items = this.lookForMatchCollections.valueChanges({ idField: 'id' });
    return this.items;
  }

  deleteLookForMatchFirebase(documentId: string): void {
    this.afs.doc<User>(`${this.LOOK_FOR_MATCH_COLLECTION}/${documentId}`)
      .delete()
      .then(() => {
        this.matSnackBar.open(
          'Procura cancelada',
          'Ok', this.DURATION_MESSAGE
        )
      })
      .catch(err => {
        this.matSnackBar.open(
          'Erro ao tentar cancelar',
          'Erro', this.DURATION_MESSAGE
        );
        console.log("Error: ", err);
      });
  }

}
