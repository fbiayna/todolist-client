import React from 'react';
import {View, FlatList} from 'react-native';
import {ListItemPresentable} from '../../interfaces/ListItemPresentable';
import {VariousContentListRenderItem} from '../../interfaces/ListRenderItem';
import ToDoListScreenItemComponent from './components/ToDoListScreenItemComponent';
import ToDoListScreenTitleComponent from './components/ToDoListScreenTitleComponent';
import {
  ToDoListScreenItemComponentProps,
  ToDoListScreenTitleComponentProps,
} from './types/ToDoListScreenComponentsProps';
import {ToDoListScreenPresenterContentType} from './types/ToDoListScreenPresenterContentType';
import ToDoListScreenStyles from './styles/ToDoListScreenStyles';
import {ToDoListScreenPresenterProps} from './types/ToDoListScreenPresenterProps';
import IconButtonComponent from '../../components/buttons/IconButtonComponent';
import ToDoListScreenAddItemComponent from './components/ToDoListScreenAddItemComponent';

const ToDoListScreenPresenter = (props: ToDoListScreenPresenterProps) => {
  /// FlatList setup

  const getData = () => {
    let screenContent: ListItemPresentable<ToDoListScreenPresenterContentType>[] =
      [];

    const titleData = {
      key: '1',
      contentType: ToDoListScreenPresenterContentType.title,
      title: 'Title',
      name: props.name,
    };

    const itemsData = props.items
      ? Object.values(props.items).map(item => ({
          key: item.id,
          contentType: ToDoListScreenPresenterContentType.item,
          itemID: item.id,
          title: item.title,
          isDone: item.isDone,
        }))
      : [];

    screenContent.push(titleData, ...itemsData);
    return screenContent;
  };

  const renderItemData: VariousContentListRenderItem<
    ToDoListScreenPresenterContentType
  > = ({item}) => {
    switch (item.contentType) {
      case ToDoListScreenPresenterContentType.title:
        return (
          <ToDoListScreenTitleComponent
            {...(item as ToDoListScreenTitleComponentProps &
              ListItemPresentable<ToDoListScreenPresenterContentType>)}
          />
        );
      case ToDoListScreenPresenterContentType.item:
        return (
          <ToDoListScreenItemComponent
            {...(item as ToDoListScreenItemComponentProps &
              ListItemPresentable<ToDoListScreenPresenterContentType>)}
          />
        );

      default:
        return null;
    }
  };

  /// Render

  return (
    <View style={ToDoListScreenStyles.container}>
      {props.isAddItemModalVisible && (
        <ToDoListScreenAddItemComponent
          visible={props.isAddItemModalVisible}
          title={'Add item'}
          itemTitle={props.newItemTitle}
          setItemTitle={props.setNewItemTitle}
          onEndAddItemTapped={props.onEndAddItemTapped}
        />
      )}
      <FlatList
        data={getData()}
        renderItem={renderItemData}
        keyExtractor={item => item.key}
      />
      <IconButtonComponent
        onPress={props.onAddItemTapped}
        source={{uri: 'https://cdn-icons-png.flaticon.com/512/262/262038.png'}}
      />
    </View>
  );
};

export default ToDoListScreenPresenter;
