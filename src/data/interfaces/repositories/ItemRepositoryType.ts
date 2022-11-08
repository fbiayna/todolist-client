import {Observable} from 'rxjs';

export interface ItemRepositoryType {
  createItem(): Observable<string>;
}
