import {AuthenticationAssemble} from './AuthenticationAssemble';
import {ItemAssemble} from './ItemAssemble';
import {UserAssemble} from './UserAssemble';

export const Assemble = () => {
  AuthenticationAssemble();
  ItemAssemble();
  UserAssemble();
};
