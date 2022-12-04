/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Subscription, take} from 'rxjs';
import {container} from 'tsyringe';
import {signOut} from '../../../application/redux/actions';
import {SignOutUseCaseType} from '../../../domain/interfaces/usecases/auth/SignOutUseCaseType';
import {OnItemChangedUseCaseType} from '../../../domain/interfaces/usecases/item/OnItemChangedUseCaseType';
import {OnUserChangedUseCaseType} from '../../../domain/interfaces/usecases/user/OnUserChangedUseCaseType';
import difference from '../../utils/SetDifference';
import {ToDoListScreenItemsData} from './types/ToDoListScreenItemsData';
import {ToDoListScreenContainerProps} from './types/ToDoListScreenContainerProps';
import ToDoListScreenPresenter from './ToDoListScreenPresenter';
import {ToDoListScreenPresenterProps} from './types/ToDoListScreenPresenterProps';

const ToDoListScreenContainer = (props: ToDoListScreenContainerProps) => {
  /// Dependencies

  const useCases = {
    onUserChangedInstance: container.resolve<OnUserChangedUseCaseType>(
      'OnUserChangedUseCaseType',
    ),
    onItemChangedInstance: container.resolve<OnItemChangedUseCaseType>(
      'OnItemChangedUseCaseType',
    ),
    signOutInstance:
      container.resolve<SignOutUseCaseType>('SignOutUseCaseType'),
  };

  /// Refs

  const itemsSubscriptions = useRef<{[key: string]: Subscription}>({});

  /// States

  const [name, setName] = useState<string>();
  const [itemsIDs, setItemsIDs] = useState<string[]>();
  const [items, setItems] = useState<ToDoListScreenItemsData>();

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
    console.log('item tapped!');
  };

  const onSignOutTapped = () => {
    useCases.signOutInstance
      .signOut()
      .pipe(take(1))
      .subscribe({
        next: () => props.signOut(),
        error: error => console.log(error),
      });
  };

  /// Presenter setup

  const presenterData = {
    name,
    itemsIDs,
    items,
    onAddItemTapped,
    onSignOutTapped,
  };

  /// Render

  return (
    <ToDoListScreenPresenter
      {...(presenterData as ToDoListScreenPresenterProps)}
    />
  );
};

const mapDispatchToProps = {
  signOut,
};

export default connect(null, mapDispatchToProps)(ToDoListScreenContainer);
