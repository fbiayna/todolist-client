import {Observable} from 'rxjs';

export interface EmailPasswordSignUpUseCaseType {
  emailPasswordSignUp(email: string, password: string): Observable<string>;
}
