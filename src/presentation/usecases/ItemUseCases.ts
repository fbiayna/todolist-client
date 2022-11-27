import {container} from 'tsyringe';
import {CreateItemUseCaseType} from '../../domain/interfaces/usecases/item/CreateItemUseCaseType';
import {DeleteItemUseCaseType} from '../../domain/interfaces/usecases/item/DeleteItemUseCaseType';
import {OnItemChangedUseCaseType} from '../../domain/interfaces/usecases/item/OnItemChangedUseCaseType';
import {SetItemIsDoneUseCaseType} from '../../domain/interfaces/usecases/item/SetItemIsDoneUseCaseType';
import {SetItemTitleUseCaseType} from '../../domain/interfaces/usecases/item/SetItemTitleUseCaseType';

/// Resolve dependencies

const {createItem} = container.resolve<CreateItemUseCaseType>(
  'CreateItemUseCaseType',
);
const {deleteItem} = container.resolve<DeleteItemUseCaseType>(
  'DeleteItemUseCaseType',
);
const {onItemChanged} = container.resolve<OnItemChangedUseCaseType>(
  'OnItemChangedUseCaseType',
);
const {setItemIsDone} = container.resolve<SetItemIsDoneUseCaseType>(
  'SetItemIsDoneUseCaseType',
);
const {setItemTitle} = container.resolve<SetItemTitleUseCaseType>(
  'SetItemTitleUseCaseType',
);

/// Main object

const itemUseCases = {
  createItem,
  deleteItem,
  onItemChanged,
  setItemIsDone,
  setItemTitle,
};

export default itemUseCases;
