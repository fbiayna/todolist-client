import {Observable} from 'rxjs';
import User from '../../../entities/User';

export interface OnUserChangedUseCaseType {
  onUserChanged(): Observable<User>;
}
