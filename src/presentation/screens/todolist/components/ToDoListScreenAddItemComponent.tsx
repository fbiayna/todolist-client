import React from 'react';
import {Modal, Text, TextInput, View} from 'react-native';
import {ToDoListScreenAddItemComponentProps} from '../types/ToDoListScreenComponentsProps';
import ToDoListScreenAddItemComponentStyles from './styles/ToDoListScreenAddItemComponentStyles';

const ToDoListScreenAddItemComponent = (
  props: ToDoListScreenAddItemComponentProps,
) => {
  return (
    <Modal visible={props.visible} transparent={true}>
      <View style={ToDoListScreenAddItemComponentStyles.container}>
        <View style={ToDoListScreenAddItemComponentStyles.contentContainer}>
          <Text>{props.title}</Text>
          <TextInput
            placeholder="Add"
            value={props.itemTitle}
            onChangeText={props.setItemTitle}
            onEndEditing={props.onEndAddItemTapped}
            returnKeyType={'done'}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ToDoListScreenAddItemComponent;
