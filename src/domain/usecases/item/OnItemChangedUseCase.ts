import {Observable} from 'rxjs';
import {inject, injectable} from 'tsyringe';
import {ItemRepositoryType} from '../../../data/interfaces/repositories/ItemRepositoryType';
import Item from '../../entities/Item';
import {OnItemChangedUseCaseType} from '../../interfaces/usecases/item/OnItemChangedUseCaseType';

@injectable()
export class OnItemChangedUseCase implements OnItemChangedUseCaseType {
  constructor(
    @inject('ItemRepositoryType')
    private itemRepository: ItemRepositoryType,
  ) {}

  onItemChanged(itemID: string): Observable<Item> {
    return this.itemRepository.onItemChanged(itemID);
  }
}
