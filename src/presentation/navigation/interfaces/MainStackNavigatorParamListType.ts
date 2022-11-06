export type MainStackNavigatorParamListType = {
  toDoListScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackNavigatorParamListType {}
  }
}
