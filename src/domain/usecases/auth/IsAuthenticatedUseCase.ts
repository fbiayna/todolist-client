import {Observable} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {AuthenticationRepositoryType} from '../../../data/interfaces/repositories/AuthenticationRepositoryType';
import {IsAuthenticatedUseCaseType} from '../../interfaces/usecases/auth/IsAuthenticatedUseCaseType';

@injectable()
export class IsAuthenticatedUseCase implements IsAuthenticatedUseCaseType {
  constructor(
    @inject('AuthenticationRepositoryType')
    private authenticationRepository: AuthenticationRepositoryType,
  ) {}

  isAuthenticated(): Observable<boolean> {
    return this.authenticationRepository.isAuthenticated();
  }
}
