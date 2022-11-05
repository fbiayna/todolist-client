import {Observable} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {UserRepositoryType} from '../../../data/interfaces/repositories/UserRepositoryType';
import User from '../../entities/User';
import {OnUserChangedUseCaseType} from '../../interfaces/usecases/user/OnUserChangedUseCaseType';

@injectable()
export class OnUserChangedUseCase implements OnUserChangedUseCaseType {
  constructor(
    @inject('UserRepositoryType')
    private userRepository: UserRepositoryType,
  ) {}

  onUserChanged(userID: string): Observable<User> {
    return this.userRepository.onUserChanged(userID);
  }
}
