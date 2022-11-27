export type ToDoListScreenTitleComponentProps = {
  title: string;
  name: string;
};

export type ToDoListScreenItemComponentProps = {
  itemID: string;
  title: string;
  isDone: boolean;
};

export type ToDoListScreenButtonsComponentProps = {
  addItemTitle: string;
  onAddItemTapped: () => void;
  signOutTitle: string;
  onSignOutTapped: () => void;
};
