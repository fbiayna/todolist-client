import {Observable} from 'rxjs';
import {injectable} from 'tsyringe';
import firestore from '@react-native-firebase/firestore';
import {ItemRepositoryType} from '../interfaces/repositories/ItemRepositoryType';
import Item from '../../domain/entities/Item';
import itemConverter from '../converters/ItemConverter';

@injectable()
export class ItemRepository implements ItemRepositoryType {
  createItem(): Observable<string> {
    return new Observable(subscriber => {
      firestore()
        .collection('items')
        .add({
          createdAt: Date.now(),
        })
        .then(snapshot => {
          subscriber.next(snapshot.id);
          subscriber.complete();
        })
        .catch(error => subscriber.error(error));
    });
  }

  onItemChanged(itemID: string): Observable<Item> {
    return new Observable(subscriber => {
      firestore()
        .collection('items')
        .doc(itemID)
        .onSnapshot(
          snapshot => {
            console.log('snapshot', snapshot.data());
            const item = itemConverter.fromFirestore(snapshot);
            subscriber.next(item);
            subscriber.complete();
          },
          error => subscriber.error(error),
        );
    });
  }

  setItemTitle(itemID: string, title: string): Observable<void> {
    return new Observable(subscriber => {
      firestore()
        .collection('items')
        .doc(itemID)
        .set({title})
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch(error => subscriber.error(error));
    });
  }

  setItemIsDone(itemID: string, isDone: boolean): Observable<void> {
    return new Observable(subscriber => {
      firestore()
        .collection('items')
        .doc(itemID)
        .set({isDone})
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch(error => subscriber.error(error));
    });
  }

  deleteItem(itemID: string): Observable<void> {
    return new Observable(subscriber => {
      firestore()
        .collection('items')
        .doc(itemID)
        .delete()
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch(error => subscriber.error(error));
    });
  }
}
