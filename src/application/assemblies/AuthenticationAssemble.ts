import {container} from 'tsyringe';

/// Repositories
import {AuthenticationRepositoryType} from '../../data/interfaces/repositories/AuthenticationRepositoryType';
import {AuthenticationRepository} from '../../data/repositories/AuthenticationRepository';

/// UseCases
import {EmailPasswordSignUpUseCaseType} from '../../domain/interfaces/usecases/auth/EmailPasswordSignUpUseCaseType';
import {IsAuthenticatedUseCaseType} from '../../domain/interfaces/usecases/auth/IsAuthenticatedUseCaseType';

import {EmailPasswordLogInUseCase} from '../../domain/usecases/auth/EmailPasswordLogInUseCase';
import {EmailPasswordLogInUseCaseType} from '../../domain/interfaces/usecases/auth/EmailPasswordLogInUseCaseType';

import {EmailPasswordSignUpUseCase} from '../../domain/usecases/auth/EmailPasswordSignUpUseCase';
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

  container.register<EmailPasswordSignUpUseCaseType>(
    'EmailPasswordSignUpUseCaseType',
    {
      useFactory: factoryContainer => {
        const authenticationRepository =
          factoryContainer.resolve<AuthenticationRepositoryType>(
            'AuthenticationRepositoryType',
          );
        return new EmailPasswordSignUpUseCase(authenticationRepository);
      },
    },
  );

  container.register<EmailPasswordLogInUseCaseType>(
    'EmailPasswordLogInUseCaseType',
    {
      useFactory: factoryContainer => {
        const authenticationRepository =
          factoryContainer.resolve<AuthenticationRepositoryType>(
            'AuthenticationRepositoryType',
          );
        return new EmailPasswordLogInUseCase(authenticationRepository);
      },
    },
  );
};
