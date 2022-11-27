import {container} from 'tsyringe';
import {CreateUserUseCaseType} from '../../domain/interfaces/usecases/user/CreateUserUseCaseType';
import {OnUserChangedUseCaseType} from '../../domain/interfaces/usecases/user/OnUserChangedUseCaseType';

/// Resolve dependencies

const {createUser} = container.resolve<CreateUserUseCaseType>(
  'CreateUserUseCaseType',
);
const {onUserChanged} = container.resolve<OnUserChangedUseCaseType>(
  'OnUserChangedUseCaseType',
);

/// Main object

const userUseCases = {
  createUser,
  onUserChanged,
};

export default userUseCases;
