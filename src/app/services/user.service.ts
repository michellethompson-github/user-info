import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public angularFirestore: AngularFirestore) { }

  createUser(Record) {
    return this.angularFirestore.collection('User').add(Record);
  }

  getAllUsers() {
    return this.angularFirestore.collection('User').snapshotChanges();
  }
}
