import {Observable} from 'rxjs';

export interface SetItemIsDoneUseCaseType {
  setItemIsDone(itemID: string, isDone: boolean): Observable<void>;
}
