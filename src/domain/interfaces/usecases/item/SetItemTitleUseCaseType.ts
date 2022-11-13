import {Observable} from 'rxjs';

export interface SetItemTitleUseCaseType {
  setItemTitle(itemID: string, title: string): Observable<void>;
}
