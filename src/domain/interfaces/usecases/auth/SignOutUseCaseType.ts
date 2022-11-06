import {Observable} from 'rxjs';

export interface SignOutUseCaseType {
  signOut(): Observable<void>;
}
