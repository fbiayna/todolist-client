import {Observable} from 'rxjs';

export interface DeleteItemUseCaseType {
  deleteItem(itemID: string): Observable<void>;
}
