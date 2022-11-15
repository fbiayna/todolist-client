/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Subscription, take} from 'rxjs';
import {container} from 'tsyringe';
import {signOut} from '../../../application/redux/actions';
import {SignOutUseCaseType} from '../../../domain/interfaces/usecases/auth/SignOutUseCaseType';
import {OnItemChangedUseCaseType} from '../../../domain/interfaces/usecases/item/OnItemChangedUseCaseType';
import {OnUserChangedUseCaseType} from '../../../domain/interfaces/usecases/user/OnUserChangedUseCaseType';
import {ListItemPresentable} from '../../interfaces/ListItemPresentable';
import {VariousContentListRenderItem} from '../../interfaces/ListRenderItem';
import difference from '../../utils/SetDifference';
import {ToDoListScreenContentType} from './interfaces/ToDoListScreenContentType';
import {ToDoListScreenItemsData} from './interfaces/ToDoListScreenItemsData';
import {ToDoListScreenProps} from './interfaces/ToDoListScreenProps';
import ToDoListScreenStyles from './styles/ToDoListScreenStyles';

const ToDoListScreen = (props: ToDoListScreenProps) => {
  /// Dependencies

  const useCases = {
    onUserChangedUseCase: container.resolve<OnUserChangedUseCaseType>(
      'OnUserChangedUseCaseType',
    ),
    onItemChangedUseCase: container.resolve<OnItemChangedUseCaseType>(
      'OnItemChangedUseCaseType',
    ),
    signOutUseCase: container.resolve<SignOutUseCaseType>('SignOutUseCaseType'),
  };

  /// Refs

  const itemsSubscriptions = useRef<{[key: string]: Subscription}>({});

  /// States

  const [name, setName] = useState<string>();
  const [itemsIDs, setItemsIDs] = useState<string[]>([]);
  const [items, setItems] = useState<ToDoListScreenItemsData>({});

  /// Effects

  useEffect(() => {
    const userSubscription = useCases.onUserChangedUseCase
      .onUserChanged()
      .subscribe({
        next: loadedUser => {
          setName(loadedUser.name);
          setItemsIDs(loadedUser.itemsIDs);
        },
        error: error => console.log(error),
      });

    return () => {
      userSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const newItemsIDs = new Set(itemsIDs);
    const oldItemsIDs = new Set(Object.keys(itemsSubscriptions.current));

    const itemsIDsToSubscribe = difference(newItemsIDs, oldItemsIDs);
    const itemsIDsToUnsubscribe = difference(oldItemsIDs, newItemsIDs);

    itemsIDsToUnsubscribe.forEach(itemID => {
      itemsSubscriptions.current[itemID].unsubscribe();
      setItems(oldItems => {
        let newItems = {...oldItems};
        delete newItems[itemID];
        return newItems;
      });
    });

    itemsIDsToSubscribe.forEach(itemID => {
      const subscription = useCases.onItemChangedUseCase
        .onItemChanged(itemID)
        .subscribe({
          next: item => {
            setItems(oldItems => ({
              ...oldItems,
              [itemID]: item,
            }));
          },
          error: error => console.log(error),
        });
      itemsSubscriptions.current[itemID] = subscription;
    });

    return () =>
      Object.keys(itemsSubscriptions.current).forEach(itemID => {
        itemsSubscriptions.current[itemID].unsubscribe();
      });
  }, [itemsIDs]);

  /// Actions

  const onSignOutTapped = () => {
    useCases.signOutUseCase
      .signOut()
      .pipe(take(1))
      .subscribe({
        next: () => props.signOut(),
        error: error => console.log(error),
      });
  };

  /// FlatList setup

  const getData = () => {
    let screenContent: ListItemPresentable<ToDoListScreenContentType>[] = [];

    const titleData = {
      key: '1',
      contentType: ToDoListScreenContentType.title,
      title: 'Title',
      name,
    };

    const itemsData = itemsIDs?.map(itemID => ({
      key: itemID,
      contentType: ToDoListScreenContentType.item,
      itemID,
      title: items[itemID].title,
      isDone: items[itemID].isDone,
    }));

    const signOutButtonData = {
      key: '2',
      contentType: ToDoListScreenContentType.signOutButton,
      title: 'Sign out',
    };

    screenContent.push(titleData, ...itemsData, signOutButtonData);
    return screenContent;
  };

  const renderItemData: VariousContentListRenderItem<
    ToDoListScreenContentType
  > = ({item}) => {
    switch (item.contentType) {
      case ToDoListScreenContentType.title:
        return null;
      case ToDoListScreenContentType.item:
        return null;
      case ToDoListScreenContentType.signOutButton:
        return null;

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

const mapDispatchToProps = {
  signOut,
};

export default connect(null, mapDispatchToProps)(ToDoListScreen);
