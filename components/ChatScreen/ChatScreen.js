import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  serverTimestamp,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import getRecipionEmail from "../../hook/getRecipionEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatScreenHeader from "./ChatScreenHeader";

import { IconButton, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Message from "./Message";

const ChatScreen = ({ chat, id }) => {
  const [user, loading] = useAuthState(auth);
  const chatUserEmail = getRecipionEmail(chat.users, user);
  const [chatFriendData, setChatFriendData] = useState({});
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const endofMessage = useRef(null);
  const [loadData, setLoadData] = useState(true);

  const scrooltoBottom = () => {
    endofMessage.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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

  useEffect(() => {
    const messagesRef = collection(db, "chats", id, "messages");
    const q = query(messagesRef, orderBy("lastSeen", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          lastSeen: doc.data().lastSeen?.toDate().getTime(),
        }))
      );
    });
    return unsubscribe;
  }, [chatUserEmail]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoadData(false);
    if (input.length > 0) {
      const messageRef = collection(db, "chats", id, "messages");
      addDoc(messageRef, {
        lastSeen: serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL,
      })
        .then(() => {
          setInput("");
          scrooltoBottom();
          setLoadData(true);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <Container>
      <ChatScreenHeader chatFriendData={chatFriendData} />

      <ChatUserScreen>
        {messages?.map((data) => (
          <Message
            key={data.id}
            chatemail={data.user}
            loginuser={user.email}
            message={data.message}
          />
        ))}
        <EndofMessage ref={endofMessage}></EndofMessage>
      </ChatUserScreen>

      <ChatScreenFooter>
        <IconButton>
          <SentimentVerySatisfiedIcon />
        </IconButton>
        <form
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "5px",
          }}
          method="post"
          onSubmit={(e) => sendMessage(e)}
        >
          <Input>
            <input
              style={{
                width: "100%",
                height: "40px",
                border: "none",
                borderRadius: "10px",
                outline: "none",
                padding: "25px",
                fontSize: "18px",
              }}
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </Input>
          <IconsContaner>
            {loadData ? (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<SendIcon />}
              />
            ) : (
              <Button
                variant="contained"
                disabled
                color="primary"
                endIcon={<SendIcon />}
              />
            )}
          </IconsContaner>
        </form>
      </ChatScreenFooter>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;

const EndofMessage = styled.div`
  margin-bottom: 60px;
`;

const Input = styled.div`
  width: 80%;
`;

const ChatUserScreen = styled.div`
  height: calc(100vh - 180px);
  display: sticky;
  padding: 10px;
  background-color: #e5ded8;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChatScreenFooter = styled.div`
  display: flex;
  background-color: #f0f2f5;
  z-index: 100;
  display: sticky;
  button: 0px;
  align-items: center;
  justify-content: space-between;
  padding: 48px 0px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const IconsContaner = styled.div``;
