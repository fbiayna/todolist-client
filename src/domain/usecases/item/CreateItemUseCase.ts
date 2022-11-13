import {mergeMap, Observable, throwError} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {AuthenticationRepositoryType} from '../../../data/interfaces/repositories/AuthenticationRepositoryType';
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
    @inject('AuthenticationRepositoryType')
    private authenticationRepository: AuthenticationRepositoryType,
  ) {}

  createItem(): Observable<void> {
    const userID = this.authenticationRepository.authenticatedUserID;

    if (!userID) {
      return throwError(() => 'There is no userID');
    }

    return this.itemRepository
      .createItem()
      .pipe(
        mergeMap(itemID => this.userRepository.addUserItemID(userID, itemID)),
      );
  }
}
