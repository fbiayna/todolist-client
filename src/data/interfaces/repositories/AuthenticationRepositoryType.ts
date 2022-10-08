import {Observable} from 'rxjs';

export interface AuthenticationRepositoryType {
  isAuthenticated(): Observable<boolean>;
  emailPasswordSignUp(email: string, password: string): Observable<string>;
  emailPasswordLogIn(email: string, password: string): Observable<string>;
}
