import {Observable} from 'rxjs';

export interface AuthenticationRepositoryType {
  emailPasswordSignUp(email: string, password: string): Observable<string>;
  emailPasswordLogIn(email: string, password: string): Observable<string>;
}
