import {Observable} from 'rxjs';

export interface CreateItemUseCaseType {
  createItem(userID: string): Observable<void>;
}
