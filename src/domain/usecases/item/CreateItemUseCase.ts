import {mergeMap, Observable} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {ItemRepositoryType} from '../../../data/interfaces/repositories/ItemRepositoryType';
import {UserRepositoryType} from '../../../data/interfaces/repositories/UserRepositoryType';
import {CreateItemUseCaseType} from '../../interfaces/usecases/item/CreateItemUseCaseType';

@injectable()
export class CreateItemUseCase implements CreateItemUseCaseType {
  constructor(
    @inject('ItemRepositoryType')
    private itemRepository: ItemRepositoryType,
    @inject('UserRepositoryType')
    private userRepository: UserRepositoryType,
  ) {}

  createItem(userID: string): Observable<void> {
    return this.itemRepository
      .createItem()
      .pipe(
        mergeMap(itemID => this.userRepository.addUserItemID(userID, itemID)),
      );
  }
}
