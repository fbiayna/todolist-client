import {Observable} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {AuthenticationRepositoryType} from '../../../data/interfaces/repositories/AuthenticationRepositoryType';
import {SignOutUseCaseType} from '../../interfaces/usecases/auth/SignOutUseCaseType';

@injectable()
export class SignOutUseCase implements SignOutUseCaseType {
  constructor(
    @inject('AuthenticationRepositoryType')
    private authenticationRepository: AuthenticationRepositoryType,
  ) {}

  signOut(): Observable<void> {
    return this.authenticationRepository.signOut();
  }
}
