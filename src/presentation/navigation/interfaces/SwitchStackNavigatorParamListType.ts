export type SwitchStackNavigatorParamListType = {
  splashScreen: undefined;
  authenticationStackNavigator: undefined;
  mainStackNavigator: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends SwitchStackNavigatorParamListType {}
  }
}
