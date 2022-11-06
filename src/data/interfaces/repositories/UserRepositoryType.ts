import {Observable} from 'rxjs';
import User from '../../../domain/entities/User';

export interface UserRepositoryType {
  createUser(userID: string, name: string, email: string): Observable<void>;
  onUserChanged(userID: string): Observable<User>;
}
