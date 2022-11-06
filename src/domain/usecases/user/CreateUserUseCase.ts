import {Observable} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {UserRepositoryType} from '../../../data/interfaces/repositories/UserRepositoryType';
import {CreateUserUseCaseType} from '../../interfaces/usecases/user/CreateUserUseCaseType';

@injectable()
export class CreateUserUseCase implements CreateUserUseCaseType {
  constructor(
    @inject('UserRepositoryType')
    private userRepository: UserRepositoryType,
  ) {}

  createUser(userID: string, name: string, email: string): Observable<void> {
    return this.userRepository.createUser(userID, name, email);
  }
}
