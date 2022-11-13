/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {take} from 'rxjs';
import {container} from 'tsyringe';
import {signOut} from '../../../application/redux/actions';
import User from '../../../domain/entities/User';
import {SignOutUseCaseType} from '../../../domain/interfaces/usecases/auth/SignOutUseCaseType';
import {OnUserChangedUseCaseType} from '../../../domain/interfaces/usecases/user/OnUserChangedUseCaseType';
import ToDoListScreenStyles from './styles/ToDoListScreenStyles';

type ToDoListScreenProps = {
  signOut: () => void;
};

const ToDoListScreen = (props: ToDoListScreenProps) => {
  /// Dependencies

  const useCases = {
    onUserChangedUseCase: container.resolve<OnUserChangedUseCaseType>(
      'OnUserChangedUseCaseType',
    ),
    signOutUseCase: container.resolve<SignOutUseCaseType>('SignOutUseCaseType'),
  };

  /// States

  const [user, setUser] = useState<User>();

  /// Effects

  useEffect(() => {
    const userSubscription = useCases.onUserChangedUseCase
      .onUserChanged()
      .subscribe({
        next: loadedUser => setUser(loadedUser),
        error: error => console.log(error),
      });

    return () => {
      userSubscription.unsubscribe();
    };
  }, []);

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
