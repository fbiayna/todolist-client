import {Observable} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {ItemRepositoryType} from '../../../data/interfaces/repositories/ItemRepositoryType';
import {SetItemTitleUseCaseType} from '../../interfaces/usecases/item/SetItemTitleUseCaseType';

@injectable()
export class SetItemTitleUseCase implements SetItemTitleUseCaseType {
  constructor(
    @inject('ItemRepositoryType')
    private itemRepository: ItemRepositoryType,
  ) {}

  setItemTitle(itemID: string, title: string): Observable<void> {
    return this.itemRepository.setItemTitle(itemID, title);
  }
}
