import AuthenticationScreenMethodsType from '../../screens/authentication/types/AuthenticationScreenMethodsType';

export type AuthenticationStackNavigatorParamListType = {
  authenticationScreen: {
    authenticationMethod:
      | AuthenticationScreenMethodsType.emailPasswordLogIn
      | AuthenticationScreenMethodsType.emailPasswordSignUp;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthenticationStackNavigatorParamListType {}
  }
}
