import AuthenticationScreenMethodsType from './AuthenticationScreenMethodsType';

export type AuthenticationScreenPresenterProps = {
  setName: (newName: string) => void;
  setEmail: (newEmail: string) => void;
  setPassword: (newPassword: string) => void;
  onEmailPasswordLogInDoneTapped: () => void;
  onEmailPasswordSignUpDoneTapped: () => void;
  onChangeAuthenticationMethodTapped: () => void;
  authenticationMethod:
    | AuthenticationScreenMethodsType.emailPasswordLogIn
    | AuthenticationScreenMethodsType.emailPasswordSignUp;
  name?: string;
  email?: string;
  password?: string;
};
