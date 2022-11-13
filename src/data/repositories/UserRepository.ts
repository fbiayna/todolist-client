import {Observable} from 'rxjs';
import {injectable} from 'tsyringe';
import firestore from '@react-native-firebase/firestore';
import User from '../../domain/entities/User';
import {UserRepositoryType} from '../interfaces/repositories/UserRepositoryType';
import userConverter from '../converters/UserConverter';

@injectable()
export class UserRepository implements UserRepositoryType {
  createUser(userID: string, name: string, email: string): Observable<void> {
    return new Observable(subscriber => {
      firestore()
        .collection('users')
        .doc(userID)
        .set({createdAt: Date.now(), name, email})
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch(error => {
          subscriber.error(error);
        });
    });
  }

  onUserChanged(userID: string): Observable<User> {
    return new Observable(subscriber => {
      firestore()
        .collection('users')
        .doc(userID)
        .onSnapshot(
          snapshot => {
            console.log('snapshot', snapshot.data());
            const user = userConverter.fromFirestore(snapshot);
            subscriber.next(user);
            subscriber.complete();
          },
          error => subscriber.error(error),
        );
    });
  }

  addUserItemID(userID: string, itemID: string): Observable<void> {
    return new Observable(subscriber => {
      firestore()
        .collection('users')
        .doc(userID)
        .update({itemsIDs: firestore.FieldValue.arrayUnion(itemID)})
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch(error => subscriber.error(error));
    });
  }

  deleteUserItemID(userID: string, itemID: string): Observable<void> {
    return new Observable(subscriber => {
      firestore()
        .collection('users')
        .doc(userID)
        .update({itemsIDs: firestore.FieldValue.arrayRemove(itemID)})
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch(error => subscriber.error(error));
    });
  }
}
