import {mergeMap, Observable} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {ItemRepositoryType} from '../../../data/interfaces/repositories/ItemRepositoryType';
import {UserRepositoryType} from '../../../data/interfaces/repositories/UserRepositoryType';
import {DeleteItemUseCaseType} from '../../interfaces/usecases/item/DeleteItemUseCaseType';

@injectable()
export class DeleteItemUseCase implements DeleteItemUseCaseType {
  constructor(
    @inject('ItemRepositoryType')
    private itemRepository: ItemRepositoryType,
    @inject('UserRepositoryType')
    private userRepository: UserRepositoryType,
  ) {}

  deleteItem(userID: string, itemID: string): Observable<void> {
    return this.itemRepository
      .deleteItem(itemID)
      .pipe(
        mergeMap(() => this.userRepository.deleteUserItemID(userID, itemID)),
      );
  }
}
