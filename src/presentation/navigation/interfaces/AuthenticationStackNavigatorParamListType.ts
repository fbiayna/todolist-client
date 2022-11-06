export type AuthenticationStackNavigatorParamListType = {
  emailPasswordSignUpScreen: undefined;
  emailPasswordLogInScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthenticationStackNavigatorParamListType {}
  }
}
