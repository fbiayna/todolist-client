import {sealed} from '../utils/sealed';

@sealed
class User {
  constructor(
    readonly id: string,
    readonly email: string | undefined = undefined,
    readonly listItemsIDs: string[] = [],
    readonly name: string | undefined = undefined,
  ) {}
}

export default User;
