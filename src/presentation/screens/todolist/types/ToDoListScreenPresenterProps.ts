import {ToDoListScreenItemsData} from './ToDoListScreenItemsData';

export type ToDoListScreenPresenterProps = {
  onAddItemTapped: () => void;
  onEndAddItemTapped: () => void;
  setNewItemTitle: (newTitle: string) => void;
  onSetItemTitleTapped: (itemID: string) => void;
  onSetItemIsDoneTapped: (itemID: string) => void;
  onDeleteItemTapped: (itemID: string) => void;
  name?: string;
  itemsIDs?: string[];
  items?: ToDoListScreenItemsData;
  isAddItemModalVisible?: boolean;
  newItemTitle?: string;
};
