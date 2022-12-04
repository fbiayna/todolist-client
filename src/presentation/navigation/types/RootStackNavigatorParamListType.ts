export type RootStackNavigatorParamListType = {
  switchStackNavigator: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackNavigatorParamListType {}
  }
}
