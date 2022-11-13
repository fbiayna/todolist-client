import {mergeMap, Observable, throwError} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {AuthenticationRepositoryType} from '../../../data/interfaces/repositories/AuthenticationRepositoryType';
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
    @inject('AuthenticationRepositoryType')
    private authenticationRepository: AuthenticationRepositoryType,
  ) {}

  deleteItem(itemID: string): Observable<void> {
    const userID = this.authenticationRepository.authenticatedUserID;

    if (!userID) {
      return throwError(() => 'There is no userID');
    }

    return this.itemRepository
      .deleteItem(itemID)
      .pipe(
        mergeMap(() => this.userRepository.deleteUserItemID(userID, itemID)),
      );
  }
}
