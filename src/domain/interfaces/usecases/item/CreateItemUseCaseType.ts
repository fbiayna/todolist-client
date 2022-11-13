import {Observable} from 'rxjs';

export interface CreateItemUseCaseType {
  createItem(): Observable<void>;
}
