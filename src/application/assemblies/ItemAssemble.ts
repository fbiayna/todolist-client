import {container} from 'tsyringe';

/// Repositories
import {ItemRepository} from '../../data/repositories/ItemRepository';
import {ItemRepositoryType} from '../../data/interfaces/repositories/ItemRepositoryType';

import {UserRepositoryType} from '../../data/interfaces/repositories/UserRepositoryType';

/// UseCases

import {CreateItemUseCaseType} from '../../domain/interfaces/usecases/item/CreateItemUseCaseType';
import {CreateItemUseCase} from '../../domain/usecases/item/CreateItemUseCase';

export const ItemAssemble = () => {
  /// Repositories

  container.register<ItemRepositoryType>('ItemRepositoryType', {
    useClass: ItemRepository,
  });

  /// UseCases

  container.register<CreateItemUseCaseType>('CreateItemUseCaseType', {
    useFactory: factoryContainer => {
      const itemRepository =
        factoryContainer.resolve<ItemRepositoryType>('ItemRepositoryType');
      const userRepository =
        factoryContainer.resolve<UserRepositoryType>('UserRepositoryType');

      return new CreateItemUseCase(itemRepository, userRepository);
    },
  });
};
