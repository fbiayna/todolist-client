import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import User from '../../domain/entities/User';

const userConverter = {
  fromFirestore: (
    snapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    const data = snapshot.data();

    if (!data) {
      return new User(snapshot.id);
    }

    let email: string | undefined;
    if (typeof data.email === 'string') {
      email = data.email;
    }

    let itemsIDs: string[] = [];
    if (
      Array.isArray(data.itemsIDs) &&
      data.itemsIDs.length &&
      data.itemsIDs.every(listItemID => typeof listItemID === 'string')
    ) {
      itemsIDs = data.itemsIDs;
    }

    let name: string | undefined;
    if (typeof data.name === 'string') {
      name = data.name;
    }

    return new User(snapshot.id, email, itemsIDs, name);
  },
};

export default userConverter;
