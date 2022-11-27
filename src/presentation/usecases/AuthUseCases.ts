import {container} from 'tsyringe';
import {EmailPasswordLogInUseCaseType} from '../../domain/interfaces/usecases/auth/EmailPasswordLogInUseCaseType';
import {EmailPasswordSignUpUseCaseType} from '../../domain/interfaces/usecases/auth/EmailPasswordSignUpUseCaseType';
import {GetAuthenticatedUserIDUseCaseType} from '../../domain/interfaces/usecases/auth/GetAuthenticatedUserIDUseCaseType';
import {IsAuthenticatedUseCaseType} from '../../domain/interfaces/usecases/auth/IsAuthenticatedUseCaseType';
import {SignOutUseCaseType} from '../../domain/interfaces/usecases/auth/SignOutUseCaseType';

/// Resolve dependencies

const {emailPasswordLogIn} = container.resolve<EmailPasswordLogInUseCaseType>(
  'EmailPasswordLogInUseCaseType',
);
const {emailPasswordSignUp} = container.resolve<EmailPasswordSignUpUseCaseType>(
  'EmailPasswordSignUpUseCaseType',
);
const {getAuthenticatedUserID} =
  container.resolve<GetAuthenticatedUserIDUseCaseType>(
    'GetAuthenticatedUserIDUseCaseType',
  );
const {isAuthenticated} = container.resolve<IsAuthenticatedUseCaseType>(
  'IsAuthenticatedUseCaseType',
);
const {signOut} = container.resolve<SignOutUseCaseType>('SignOutUseCaseType');

/// Main object

const authUseCases = {
  emailPasswordLogIn,
  emailPasswordSignUp,
  getAuthenticatedUserID,
  isAuthenticated,
  signOut,
};

export default authUseCases;
