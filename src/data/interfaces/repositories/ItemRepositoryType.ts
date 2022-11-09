import {Observable} from 'rxjs';

export interface ItemRepositoryType {
  createItem(): Observable<string>;
  deleteItem(itemID: string): Observable<void>;
}
