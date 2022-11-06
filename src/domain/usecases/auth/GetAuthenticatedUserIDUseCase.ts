import {inject, injectable} from 'tsyringe';
import {AuthenticationRepositoryType} from '../../../data/interfaces/repositories/AuthenticationRepositoryType';
import {GetAuthenticatedUserIDUseCaseType} from '../../interfaces/usecases/auth/GetAuthenticatedUserIDUseCaseType';

@injectable()
export class GetAuthenticatedUserIDUseCase
  implements GetAuthenticatedUserIDUseCaseType
{
  constructor(
    @inject('AuthenticationRepositoryType')
    private authenticationRepository: AuthenticationRepositoryType,
  ) {}

  getAuthenticatedUserID(): string | undefined {
    return this.authenticationRepository.authenticatedUserID;
  }
}
