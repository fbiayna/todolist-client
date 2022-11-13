import {Observable} from 'rxjs';

export interface EmailPasswordLogInUseCaseType {
  emailPasswordLogIn(email: string, password: string): Observable<void>;
}
