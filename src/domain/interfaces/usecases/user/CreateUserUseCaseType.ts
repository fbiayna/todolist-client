import {Observable} from 'rxjs';

export interface CreateUserUseCaseType {
  createUser(userID: string, name: string, email: string): Observable<void>;
}
