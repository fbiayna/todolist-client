import {Observable} from 'rxjs';

export interface IsAuthenticatedUseCaseType {
  isAuthenticated(): Observable<boolean>;
}
