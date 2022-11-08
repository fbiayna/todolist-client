import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import Item from '../../domain/entities/Item';

const itemConverter = {
  fromFirestore: (
    snapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    const data = snapshot.data();

    if (!data) {
      return new Item(snapshot.id);
    }

    let title: string | undefined;
    if (typeof data.title === 'string') {
      title = data.title;
    }

    let isDone: boolean | undefined;
    if (typeof data.isDone === 'boolean') {
      isDone = data.isDone;
    }

    return new Item(snapshot.id, title, isDone);
  },
};

export default itemConverter;
