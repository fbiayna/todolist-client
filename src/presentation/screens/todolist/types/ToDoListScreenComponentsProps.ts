import {ModalProps} from 'react-native';

export type ToDoListScreenTitleComponentProps = {
  title: string;
  name: string;
};

export type ToDoListScreenItemComponentProps = {
  itemID: string;
  title: string;
  isDone: boolean;
};

export type ToDoListScreenAddItemComponentProps = {
  title: string;
  setItemTitle: (newTitle: string) => void;
  onEndAddItemTapped: () => void;
  itemTitle?: string;
} & ModalProps;
