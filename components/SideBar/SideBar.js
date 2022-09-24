import { IconButton, Avatar, Button } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import * as Emailvalidator from "email-validator";
import { signOut, auth, db } from "../../firebase";
import { addDoc, collection, query, where, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "../Chat/Chat";

const SideBar = () => {
  const [user] = useAuthState(auth);

  let userChatRef = collection(db, "chats");
  const resutl = query(
    userChatRef,
    where("users", "array-contains", user.email)
  );
  const [chatsSnapshot] = useCollection(resutl);

  const chatAlreadyExists = (recipientEmail) => {
    return !!chatsSnapshot?.docs.find(
      (chat) =>
        chat?.data()?.users?.find((data) => data == recipientEmail)?.length > 0
    );
  };

  const createChat = () => {
    const input = prompt("plz enter you emial");

    if (!input) {
      return null;
    }
    if (
      Emailvalidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      const dbRef = collection(db, "chats");
      addDoc(dbRef, {
        users: [user.email, input],
      }).catch(alert);
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar
          src={user ? user.photoURL : "#"}
          onClick={() => signOut(auth)}
        ></UserAvatar>{" "}
        <p>{user?.displayName}</p>
        <IconsContaner>
          <IconButton>
            <ChatIcon></ChatIcon>
          </IconButton>
          <IconButton>
            <MoreVert></MoreVert>
          </IconButton>
        </IconsContaner>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Serach in chats"></SearchInput>
      </Search>
      <SearchButton onClick={createChat}>Chat</SearchButton>
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} chatUsers={chat.data().users} />
      ))}
    </Container>
  );
};

export default SideBar;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  outline-style: solid;
  border: none;
  flex: 1;
`;

const SearchButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Container = styled.div`
  flex: 0.4;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-weight: 300px;
  max-weight: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #f0f2f5;
  z-index: 1;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  font-size: 16px;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const IconsContaner = styled.div`
  @media (max-width: 650px) {
    display: none;
  }
`;
