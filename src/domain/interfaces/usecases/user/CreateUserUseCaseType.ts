import {Observable} from 'rxjs';

export interface CreateUserUseCaseType {
  createUser(name: string, email: string): Observable<void>;
}
