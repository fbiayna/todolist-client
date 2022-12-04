import {ToDoListScreenItemsData} from './ToDoListScreenItemsData';

export type ToDoListScreenPresenterProps = {
  onAddItemTapped: () => void;
  onSignOutTapped: () => void;
  name?: string;
  itemsIDs?: string[];
  items?: ToDoListScreenItemsData;
};
