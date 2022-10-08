import {Observable} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {AuthenticationRepositoryType} from '../../../data/interfaces/repositories/AuthenticationRepositoryType';
import {EmailPasswordLogInUseCaseType} from '../../interfaces/usecases/auth/EmailPasswordLogInUseCaseType';

@injectable()
export class EmailPasswordLogInUseCase
  implements EmailPasswordLogInUseCaseType
{
  constructor(
    @inject('AuthenticationRepositoryType')
    private authenticationRepository: AuthenticationRepositoryType,
  ) {}

  emailPasswordLogIn(email: string, password: string): Observable<string> {
    return this.authenticationRepository.emailPasswordLogIn(email, password);
  }
}
