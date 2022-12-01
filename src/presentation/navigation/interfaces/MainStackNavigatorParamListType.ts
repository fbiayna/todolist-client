export type MainStackNavigatorParamListType = {
  toDoListScreenContainer: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackNavigatorParamListType {}
  }
}
