import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import getRecipionEmail from "../../hook/getRecipionEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatScreenHeader from "./ChatScreenHeader";
import { useCollection } from "react-firebase-hooks/firestore";

const ChatScreen = ({ chat, id }) => {
  const [user, loading] = useAuthState(auth);
  const chatUserEmail = getRecipionEmail(chat.users, user);
  const [chatFriendData, setChatFriendData] = useState({});

  /*   const usersColRef = collection(db, "users");
  const resutl = query(usersColRef, where("email", "==", chatUserEmail));

  const [usersSnapshot] = useCollection(resutl);

  const chatFriendData = usersSnapshot?.docs?.[0]?.data();
  console.log(chatFriendData); */
  useEffect(() => {
    const cks = async () => {
      const q = query(
        collection(db, "users"),
        where("email", "==", chatUserEmail)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setChatFriendData(doc.data());
      });
    };
    cks();
  }, [chatUserEmail]);

  return (
    <Container>
      <ChatScreenHeader chatFriendData={chatFriendData} />
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;
