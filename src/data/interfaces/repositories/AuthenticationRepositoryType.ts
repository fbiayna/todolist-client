import {Observable} from 'rxjs';

export interface AuthenticationRepositoryType {
  authenticatedUserID: string | undefined;
  isAuthenticated(): Observable<boolean>;
  emailPasswordSignUp(email: string, password: string): Observable<string>;
  emailPasswordLogIn(email: string, password: string): Observable<string>;
}
