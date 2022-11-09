import {Observable} from 'rxjs';

export interface DeleteItemUseCaseType {
  deleteItem(userID: string, itemID: string): Observable<void>;
}
