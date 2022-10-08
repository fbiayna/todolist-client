export type AuthenticationStackParamListType = {
  emailPasswordSignUp: undefined;
  emailPasswordLogIn: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthenticationStackParamListType {}
  }
}
