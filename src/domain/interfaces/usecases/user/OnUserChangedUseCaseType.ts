import {Observable} from 'rxjs';
import User from '../../../entities/User';

export interface OnUserChangedUseCaseType {
  onUserChanged(userID: string): Observable<User>;
}
