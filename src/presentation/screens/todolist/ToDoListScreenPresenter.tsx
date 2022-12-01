import React from 'react';
import {View, FlatList} from 'react-native';
import {ListItemPresentable} from '../../interfaces/ListItemPresentable';
import {VariousContentListRenderItem} from '../../interfaces/ListRenderItem';
import ToDoListScreenButtonsComponent from './components/ToDoListScreenButtonsComponent';
import ToDoListScreenItemComponent from './components/ToDoListScreenItemComponent';
import ToDoListScreenTitleComponent from './components/ToDoListScreenTitleComponent';
import {
  ToDoListScreenButtonsComponentProps,
  ToDoListScreenItemComponentProps,
  ToDoListScreenTitleComponentProps,
} from './types/ToDoListScreenComponentsProps';
import {ToDoListScreenContentType} from './types/ToDoListScreenContentType';
import ToDoListScreenStyles from './styles/ToDoListScreenStyles';
import {ToDoListScreenPresenterProps} from './types/ToDoListScreenPresenterProps';

const ToDoListScreenPresenter = (props: ToDoListScreenPresenterProps) => {
  /// FlatList setup

  const getData = () => {
    let screenContent: ListItemPresentable<ToDoListScreenContentType>[] = [];

    const titleData = {
      key: '1',
      contentType: ToDoListScreenContentType.title,
      title: 'Title',
      name: props.name,
    };

    const itemsData =
      props.itemsIDs?.map(itemID => ({
        key: itemID,
        contentType: ToDoListScreenContentType.item,
        itemID,
        title: props.items?.[itemID].title,
        isDone: props.items?.[itemID].isDone,
      })) ?? [];

    const buttonsData = {
      key: '2',
      contentType: ToDoListScreenContentType.buttons,
      addItemTitle: 'Add item',
      onAddItemTapped: props.onAddItemTapped,
      signOutTitle: 'Sign out',
      onSignOutTapped: props.onSignOutTapped,
    };

    screenContent.push(titleData, ...itemsData, buttonsData);
    return screenContent;
  };

  const renderItemData: VariousContentListRenderItem<
    ToDoListScreenContentType
  > = ({item}) => {
    switch (item.contentType) {
      case ToDoListScreenContentType.title:
        return (
          <ToDoListScreenTitleComponent
            {...(item as ToDoListScreenTitleComponentProps &
              ListItemPresentable<ToDoListScreenContentType>)}
          />
        );
      case ToDoListScreenContentType.item:
        return (
          <ToDoListScreenItemComponent
            {...(item as ToDoListScreenItemComponentProps &
              ListItemPresentable<ToDoListScreenContentType>)}
          />
        );
      case ToDoListScreenContentType.buttons:
        return (
          <ToDoListScreenButtonsComponent
            {...(item as ToDoListScreenButtonsComponentProps &
              ListItemPresentable<ToDoListScreenContentType>)}
          />
        );

      default:
        return null;
    }
  };

  /// Render

  return (
    <View style={ToDoListScreenStyles.container}>
      <FlatList
        data={getData()}
        renderItem={renderItemData}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default ToDoListScreenPresenter;
