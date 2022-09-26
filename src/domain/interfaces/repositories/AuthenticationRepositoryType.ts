import {Observable} from 'rxjs';

export interface AuthenticationRepositoryType {
  emailPasswordSignUp(email: string, password: string): Observable<string>;
}
