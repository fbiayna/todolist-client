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

    let listItemsIDs: string[] = [];
    if (
      Array.isArray(data.listItemsIDs) &&
      data.listItemsIDs.length &&
      data.listItemsIDs.every(listItemID => typeof listItemID === 'string')
    ) {
      listItemsIDs = data.listItemsIDs;
    }

    let name: string | undefined;
    if (typeof data.name === 'string') {
      name = data.name;
    }

    return new User(snapshot.id, email, listItemsIDs, name);
  },
};

export default userConverter;
