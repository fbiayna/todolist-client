import {container} from 'tsyringe';

/// Repositories
import {ItemRepository} from '../../data/repositories/ItemRepository';
import {ItemRepositoryType} from '../../data/interfaces/repositories/ItemRepositoryType';

import {UserRepositoryType} from '../../data/interfaces/repositories/UserRepositoryType';

/// UseCases

import {CreateItemUseCaseType} from '../../domain/interfaces/usecases/item/CreateItemUseCaseType';
import {CreateItemUseCase} from '../../domain/usecases/item/CreateItemUseCase';

import {DeleteItemUseCaseType} from '../../domain/interfaces/usecases/item/DeleteItemUseCaseType';
import {DeleteItemUseCase} from '../../domain/usecases/item/DeleteItemUseCase';

import {OnItemChangedUseCaseType} from '../../domain/interfaces/usecases/item/OnItemChangedUseCaseType';
import {OnItemChangedUseCase} from '../../domain/usecases/item/OnItemChangedUseCase';

import {SetItemTitleUseCase} from '../../domain/usecases/item/SetItemTitleUseCase';
import {SetItemTitleUseCaseType} from '../../domain/interfaces/usecases/item/SetItemTitleUseCaseType';

import {SetItemIsDoneUseCaseType} from '../../domain/interfaces/usecases/item/SetItemIsDoneUseCaseType';
import {SetItemIsDoneUseCase} from '../../domain/usecases/item/SetItemIsDoneUseCase';
import {AuthenticationRepositoryType} from '../../data/interfaces/repositories/AuthenticationRepositoryType';

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
      const authenticationRepository =
        factoryContainer.resolve<AuthenticationRepositoryType>(
          'AuthenticationRepositoryType',
        );

      return new CreateItemUseCase(
        itemRepository,
        userRepository,
        authenticationRepository,
      );
    },
  });

  container.register<OnItemChangedUseCaseType>('OnItemChangedUseCaseType', {
    useFactory: factoryContainer => {
      const itemRepository =
        factoryContainer.resolve<ItemRepositoryType>('ItemRepositoryType');

      return new OnItemChangedUseCase(itemRepository);
    },
  });

  container.register<SetItemTitleUseCaseType>('SetItemTitleUseCaseType', {
    useFactory: factoryContainer => {
      const itemRepository =
        factoryContainer.resolve<ItemRepositoryType>('ItemRepositoryType');

      return new SetItemTitleUseCase(itemRepository);
    },
  });

  container.register<SetItemIsDoneUseCaseType>('SetItemIsDoneUseCaseType', {
    useFactory: factoryContainer => {
      const itemRepository =
        factoryContainer.resolve<ItemRepositoryType>('ItemRepositoryType');

      return new SetItemIsDoneUseCase(itemRepository);
    },
  });

  container.register<DeleteItemUseCaseType>('DeleteItemUseCaseType', {
    useFactory: factoryContainer => {
      const itemRepository =
        factoryContainer.resolve<ItemRepositoryType>('ItemRepositoryType');
      const userRepository =
        factoryContainer.resolve<UserRepositoryType>('UserRepositoryType');
      const authenticationRepository =
        factoryContainer.resolve<AuthenticationRepositoryType>(
          'AuthenticationRepositoryType',
        );

      return new DeleteItemUseCase(
        itemRepository,
        userRepository,
        authenticationRepository,
      );
    },
  });
};
