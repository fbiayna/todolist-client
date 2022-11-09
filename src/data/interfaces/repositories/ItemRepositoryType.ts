import {Observable} from 'rxjs';

export interface ItemRepositoryType {
  createItem(): Observable<string>;
  setItemTitle(itemID: string, title: string): Observable<void>;
  deleteItem(itemID: string): Observable<void>;
}
