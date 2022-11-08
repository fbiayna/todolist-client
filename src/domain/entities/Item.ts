import {sealed} from '../utils/sealed';

@sealed
class Item {
  constructor(
    readonly id: string,
    readonly title: string | undefined = undefined,
    readonly isDone: boolean | undefined = undefined,
  ) {}
}

export default Item;
