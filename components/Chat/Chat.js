import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import getRecipionEmail from "../../hook/getRecipionEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { Avatar } from "@material-ui/core";
import { useRouter } from "next/router";

const Chat = ({ id, chatUsers }) => {
  const [user] = useAuthState(auth);
  const chatListUserEmail = getRecipionEmail(chatUsers, user);

  /*photo get user chat */
  const usersColRef = collection(db, "users");
  const resutl = query(usersColRef, where("email", "==", chatListUserEmail));

  const [usersSnapshot] = useCollection(resutl);

  const chatUserPhoto = usersSnapshot?.docs?.[0]?.data();
  /*photo get user chat end*/
  const router = useRouter();
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Continter onClick={enterChat}>
      {chatUserPhoto ? (
        <ChatAvatar src={chatUserPhoto?.photoURL}></ChatAvatar>
      ) : (
        <ChatAvatar>{chatListUserEmail[0]}</ChatAvatar>
      )}

      <p> {chatUserPhoto ? chatUserPhoto?.displayName : chatListUserEmail}</p>
    </Continter>
  );
};

export default Chat;

const Continter = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  cursor: pointer;
  word-wrap: break-word;
  :hover {
    background-color: whitesmoke;
  }
`;

const ChatAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
