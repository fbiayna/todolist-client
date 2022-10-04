import {container} from 'tsyringe';
import {AuthenticationRepositoryType} from '../../data/interfaces/repositories/AuthenticationRepositoryType';
import {AuthenticationRepository} from '../../data/repositories/AuthenticationRepository';
import {IsAuthenticatedUseCaseType} from '../../domain/interfaces/usecases/auth/IsAuthenticatedUseCaseType';
import {IsAuthenticatedUseCase} from '../../domain/usecases/auth/IsAuthenticatedUseCase';

export const AuthenticationAssemble = () => {
  // Repositories

  container.register<AuthenticationRepositoryType>(
    'AuthenticationRepositoryType',
    {
      useClass: AuthenticationRepository,
    },
  );

  // UseCases

  container.register<IsAuthenticatedUseCaseType>('IsAuthenticatedUseCaseType', {
    useFactory: factoryContainer => {
      const authenticationRepository =
        factoryContainer.resolve<AuthenticationRepositoryType>(
          'AuthenticationRepositoryType',
        );
      return new IsAuthenticatedUseCase(authenticationRepository);
    },
  });
};
