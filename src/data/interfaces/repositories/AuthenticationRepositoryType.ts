import {Observable} from 'rxjs';

export interface AuthenticationRepositoryType {
  authenticatedUserID: string | undefined;
  isAuthenticated(): Observable<boolean>;
  emailPasswordSignUp(email: string, password: string): Observable<void>;
  emailPasswordLogIn(email: string, password: string): Observable<void>;
  signOut(): Observable<void>;
}
