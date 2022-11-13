import {Observable} from 'rxjs';
import Item from '../../../domain/entities/Item';

export interface ItemRepositoryType {
  createItem(): Observable<string>;
  onItemChanged(itemID: string): Observable<Item>;
  setItemTitle(itemID: string, title: string): Observable<void>;
  setItemIsDone(itemID: string, isDone: boolean): Observable<void>;
  deleteItem(itemID: string): Observable<void>;
}
