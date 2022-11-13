import {Observable} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {AuthenticationRepositoryType} from '../../../data/interfaces/repositories/AuthenticationRepositoryType';
import {EmailPasswordSignUpUseCaseType} from '../../interfaces/usecases/auth/EmailPasswordSignUpUseCaseType';

@injectable()
export class EmailPasswordSignUpUseCase
  implements EmailPasswordSignUpUseCaseType
{
  constructor(
    @inject('AuthenticationRepositoryType')
    private authenticationRepository: AuthenticationRepositoryType,
  ) {}

  emailPasswordSignUp(email: string, password: string): Observable<void> {
    return this.authenticationRepository.emailPasswordSignUp(email, password);
  }
}
