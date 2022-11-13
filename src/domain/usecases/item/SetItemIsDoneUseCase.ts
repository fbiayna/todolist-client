import {Observable} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {ItemRepositoryType} from '../../../data/interfaces/repositories/ItemRepositoryType';
import {SetItemIsDoneUseCaseType} from '../../interfaces/usecases/item/SetItemIsDoneUseCaseType';

@injectable()
export class SetItemIsDoneUseCase implements SetItemIsDoneUseCaseType {
  constructor(
    @inject('ItemRepositoryType')
    private itemRepository: ItemRepositoryType,
  ) {}

  setItemIsDone(itemID: string, isDone: boolean): Observable<void> {
    return this.itemRepository.setItemIsDone(itemID, isDone);
  }
}
