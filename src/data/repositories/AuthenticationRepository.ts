import {Observable} from 'rxjs';
import {injectable} from 'tsyringe';
import {AuthenticationRepositoryType} from '../interfaces/repositories/AuthenticationRepositoryType';
import auth from '@react-native-firebase/auth';

@injectable()
export class AuthenticationRepository implements AuthenticationRepositoryType {
  get authenticatedUserID(): string | undefined {
    return auth().currentUser?.uid;
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable(subscriber => {
      auth().onAuthStateChanged(user => {
        if (user) {
          subscriber.next(true);
        } else {
          subscriber.next(false);
        }

        subscriber.complete();
      });
    });
  }

  emailPasswordSignUp(email: string, password: string): Observable<string> {
    return new Observable(subscriber => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const newUserID = userCredential.user.uid;
          subscriber.next(newUserID);
          subscriber.complete();
        })
        .catch(error => {
          subscriber.error(error);
        });
    });
  }

  emailPasswordLogIn(email: string, password: string): Observable<string> {
    return new Observable(subscriber => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          const userID = userCredential.user.uid;
          subscriber.next(userID);
          subscriber.complete();
        })
        .catch(error => {
          subscriber.error(error);
        });
    });
  }
}
