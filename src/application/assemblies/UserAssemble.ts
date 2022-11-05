import {container} from 'tsyringe';

/// Repositories
import {UserRepositoryType} from '../../data/interfaces/repositories/UserRepositoryType';
import {UserRepository} from '../../data/repositories/UserRepository';

/// UseCases
import {CreateUserUseCaseType} from '../../domain/interfaces/usecases/user/CreateUserUseCaseType';
import {OnUserChangedUseCaseType} from '../../domain/interfaces/usecases/user/OnUserChangedUseCaseType';

import {CreateUserUseCase} from '../../domain/usecases/user/CreateUserUseCase';
import {OnUserChangedUseCase} from '../../domain/usecases/user/OnUserChangedUseCase';

export const UserAssemble = () => {
  /// Repositories

  container.register<UserRepositoryType>('UserRepositoryType', {
    useClass: UserRepository,
  });

  /// UseCases

  container.register<CreateUserUseCaseType>('CreateUserUseCaseType', {
    useFactory: factoryContainer => {
      const userRepository =
        factoryContainer.resolve<UserRepositoryType>('UserRepositoryType');

      return new CreateUserUseCase(userRepository);
    },
  });

  container.register<OnUserChangedUseCaseType>('OnUserChangedUseCaseType', {
    useFactory: factoryContainer => {
      const userRepository =
        factoryContainer.resolve<UserRepositoryType>('UserRepositoryType');

      return new OnUserChangedUseCase(userRepository);
    },
  });
};
