import {Observable} from 'rxjs';
import Item from '../../../entities/Item';

export interface OnItemChangedUseCaseType {
  onItemChanged(itemID: string): Observable<Item>;
}
