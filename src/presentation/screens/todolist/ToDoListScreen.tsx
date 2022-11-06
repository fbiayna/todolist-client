import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {Subscription} from 'rxjs';
import {container} from 'tsyringe';
import User from '../../../domain/entities/User';
import {GetAuthenticatedUserIDUseCaseType} from '../../../domain/interfaces/usecases/auth/GetAuthenticatedUserIDUseCaseType';
import {OnUserChangedUseCaseType} from '../../../domain/interfaces/usecases/user/OnUserChangedUseCaseType';
import ToDoListScreenStyles from './styles/ToDoListScreenStyles';

const ToDoListScreen = () => {
  /// Dependencies

  const useCases = {
    getAuthenticatedUserIDUseCase:
      container.resolve<GetAuthenticatedUserIDUseCaseType>(
        'GetAuthenticatedUserIDUseCaseType',
      ),
    onUserChangedUseCase: container.resolve<OnUserChangedUseCaseType>(
      'OnUserChangedUseCaseType',
    ),
  };

  /// Properties

  const userID =
    useCases.getAuthenticatedUserIDUseCase.getAuthenticatedUserID();

  /// References

  const userSubscription = useRef<Subscription>();

  /// States

  const [user, setUser] = useState<User>();

  /// Effects

  useEffect(() => {
    if (userID) {
      userSubscription.current = useCases.onUserChangedUseCase
        .onUserChanged(userID)
        .subscribe({
          next: loadedUser => setUser(loadedUser),
          error: error => console.log(error),
        });
    }
  }, [useCases.onUserChangedUseCase, userID]);

  useEffect(
    () => () => {
      userSubscription.current?.unsubscribe();
    },
    [],
  );

  /// Render

  return (
    <View style={ToDoListScreenStyles.container}>
      <Text>{`Hello ${user?.name}!`}</Text>
    </View>
  );
};

export default ToDoListScreen;
