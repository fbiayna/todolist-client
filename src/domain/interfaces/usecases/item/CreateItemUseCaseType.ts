import {Observable} from 'rxjs';

export interface CreateItemUseCaseType {
  createItem(title: string): Observable<void>;
}
