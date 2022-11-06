/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {Subscription, take} from 'rxjs';
import {container} from 'tsyringe';
import {signOut} from '../../../application/redux/actions';
import User from '../../../domain/entities/User';
import {GetAuthenticatedUserIDUseCaseType} from '../../../domain/interfaces/usecases/auth/GetAuthenticatedUserIDUseCaseType';
import {SignOutUseCaseType} from '../../../domain/interfaces/usecases/auth/SignOutUseCaseType';
import {OnUserChangedUseCaseType} from '../../../domain/interfaces/usecases/user/OnUserChangedUseCaseType';
import ToDoListScreenStyles from './styles/ToDoListScreenStyles';

type ToDoListScreenProps = {
  signOut: () => void;
};

const ToDoListScreen = (props: ToDoListScreenProps) => {
  /// Dependencies

  const useCases = {
    getAuthenticatedUserIDUseCase:
      container.resolve<GetAuthenticatedUserIDUseCaseType>(
        'GetAuthenticatedUserIDUseCaseType',
      ),
    onUserChangedUseCase: container.resolve<OnUserChangedUseCaseType>(
      'OnUserChangedUseCaseType',
    ),
    signOutUseCase: container.resolve<SignOutUseCaseType>('SignOutUseCaseType'),
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
  }, [userID]);

  useEffect(
    () => () => {
      userSubscription.current?.unsubscribe();
    },
    [],
  );

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

  /// Render

  return (
    <View style={ToDoListScreenStyles.container}>
      <Text>{`Hello ${user?.name}!`}</Text>
      <TouchableWithoutFeedback onPress={onSignOutTapped}>
        <Text>Sign Out</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const mapDispatchToProps = {
  signOut,
};

export default connect(null, mapDispatchToProps)(ToDoListScreen);
