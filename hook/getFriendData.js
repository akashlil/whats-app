import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";

const getFriendData = async (users) => {
  const [friend, setFriend] = useState([]);
  const [user, loading] = useAuthState(auth);
  const friendId = users?.filter((userss) => userss !== user.email);

  /* get id */
  const q = query(collection(db, "users"), where("email", "==", friendId[0]));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    setFriend(doc.id);
  });

  return friend;
  /* get data */
};

export default getFriendData;
