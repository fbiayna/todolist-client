import {Observable, throwError} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {AuthenticationRepositoryType} from '../../../data/interfaces/repositories/AuthenticationRepositoryType';
import {UserRepositoryType} from '../../../data/interfaces/repositories/UserRepositoryType';
import {CreateUserUseCaseType} from '../../interfaces/usecases/user/CreateUserUseCaseType';

@injectable()
export class CreateUserUseCase implements CreateUserUseCaseType {
  constructor(
    @inject('UserRepositoryType')
    private userRepository: UserRepositoryType,
    @inject('AuthenticationRepositoryType')
    private authenticationRepository: AuthenticationRepositoryType,
  ) {}

  createUser(name: string, email: string): Observable<void> {
    const userID = this.authenticationRepository.authenticatedUserID;

    if (!userID) {
      return throwError(() => 'There is no userID');
    }

    return this.userRepository.createUser(userID, name, email);
  }
}
