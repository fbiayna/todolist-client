/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {Subscription, take} from 'rxjs';
import {container} from 'tsyringe';
import {OnItemChangedUseCaseType} from '../../../domain/interfaces/usecases/item/OnItemChangedUseCaseType';
import {OnUserChangedUseCaseType} from '../../../domain/interfaces/usecases/user/OnUserChangedUseCaseType';
import difference from '../../utils/SetDifference';
import {ToDoListScreenItemsData} from './types/ToDoListScreenItemsData';
import ToDoListScreenPresenter from './ToDoListScreenPresenter';
import {ToDoListScreenPresenterProps} from './types/ToDoListScreenPresenterProps';
import {CreateItemUseCaseType} from '../../../domain/interfaces/usecases/item/CreateItemUseCaseType';
import {DeleteItemUseCaseType} from '../../../domain/interfaces/usecases/item/DeleteItemUseCaseType';
import {SetItemTitleUseCaseType} from '../../../domain/interfaces/usecases/item/SetItemTitleUseCaseType';
import {SetItemIsDoneUseCaseType} from '../../../domain/interfaces/usecases/item/SetItemIsDoneUseCaseType';

const ToDoListScreenContainer = () => {
  /// Dependencies

  const useCases = {
    onUserChangedInstance: container.resolve<OnUserChangedUseCaseType>(
      'OnUserChangedUseCaseType',
    ),
    onItemChangedInstance: container.resolve<OnItemChangedUseCaseType>(
      'OnItemChangedUseCaseType',
    ),
    createItemInstance: container.resolve<CreateItemUseCaseType>(
      'CreateItemUseCaseType',
    ),
    setItemTitleInstance: container.resolve<SetItemTitleUseCaseType>(
      'SetItemTitleUseCaseType',
    ),
    setItemIsDoneInstance: container.resolve<SetItemIsDoneUseCaseType>(
      'SetItemIsDoneUseCaseType',
    ),
    deleteItemInstance: container.resolve<DeleteItemUseCaseType>(
      'DeleteItemUseCaseType',
    ),
  };

  /// Refs

  const itemsSubscriptions = useRef<{[key: string]: Subscription}>({});

  /// States

  const [name, setName] = useState<string>();
  const [itemsIDs, setItemsIDs] = useState<string[]>();
  const [items, setItems] = useState<ToDoListScreenItemsData>();
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState<boolean>();
  const [newItemTitle, setNewItemTitle] = useState<string>();

  /// Effects

  useEffect(() => {
    const userSubscription = useCases.onUserChangedInstance
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
      delete itemsSubscriptions.current[itemID];
      setItems(oldItems => {
        let newItems = {...oldItems};
        delete newItems[itemID];
        return newItems;
      });
    });

    itemsIDsToSubscribe.forEach(itemID => {
      const subscription = useCases.onItemChangedInstance
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

  const onAddItemTapped = () => {
    setIsAddItemModalVisible(true);
  };

  const onEndAddItemTapped = () => {
    if (newItemTitle) {
      useCases.createItemInstance
        .createItem(newItemTitle)
        .pipe(take(1))
        .subscribe({error: error => console.log(error)});
    }
  };

  const onSetItemTitleTapped = (itemID: string) => {
    if (!newItemTitle) {
      return onDeleteItemTapped(itemID);
    }

    useCases.setItemTitleInstance
      .setItemTitle(itemID, newItemTitle)
      .pipe(take(1))
      .subscribe({error: error => console.log(error)});
  };

  const onSetItemIsDoneTapped = (itemID: string) => {
    useCases.setItemIsDoneInstance
      .setItemIsDone(itemID, !items?.[itemID].isDone)
      .pipe(take(1))
      .subscribe({error: error => console.log(error)});
  };

  const onDeleteItemTapped = (itemID: string) => {
    useCases.deleteItemInstance
      .deleteItem(itemID)
      .pipe(take(1))
      .subscribe({error: error => console.log(error)});
  };

  /// Presenter setup

  const presenterData = {
    name,
    itemsIDs,
    items,
    isAddItemModalVisible,
    newItemTitle,
    setNewItemTitle,
    onAddItemTapped,
    onEndAddItemTapped,
    onSetItemTitleTapped,
    onSetItemIsDoneTapped,
    onDeleteItemTapped,
  };

  /// Render

  return (
    <ToDoListScreenPresenter
      {...(presenterData as ToDoListScreenPresenterProps)}
    />
  );
};

export default ToDoListScreenContainer;
