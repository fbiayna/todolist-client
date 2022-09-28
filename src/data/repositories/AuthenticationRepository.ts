import {Observable} from 'rxjs';
import {injectable} from 'tsyringe';
import {AuthenticationRepositoryType} from '../../domain/interfaces/repositories/AuthenticationRepositoryType';
import auth from '@react-native-firebase/auth';

@injectable()
export class AuthenticationRepository implements AuthenticationRepositoryType {
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
