import {Observable, throwError} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {AuthenticationRepositoryType} from '../../../data/interfaces/repositories/AuthenticationRepositoryType';
import {UserRepositoryType} from '../../../data/interfaces/repositories/UserRepositoryType';
import User from '../../entities/User';
import {OnUserChangedUseCaseType} from '../../interfaces/usecases/user/OnUserChangedUseCaseType';

@injectable()
export class OnUserChangedUseCase implements OnUserChangedUseCaseType {
  constructor(
    @inject('UserRepositoryType')
    private userRepository: UserRepositoryType,
    @inject('AuthenticationRepositoryType')
    private authenticationRepository: AuthenticationRepositoryType,
  ) {}

  onUserChanged(): Observable<User> {
    const userID = this.authenticationRepository.authenticatedUserID;

    if (!userID) {
      return throwError(() => 'There is no userID');
    }

    return this.userRepository.onUserChanged(userID);
  }
}
