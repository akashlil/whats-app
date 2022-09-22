import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
import SideBar from "../../components/SideBar/SideBar";
import {
  doc,
  getDoc,
  collection,
  orderBy,
  Timestamp,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { query as firebseCOk } from "firebase/firestore";
import { db } from "../../firebase";

const ChatRead = ({ id, chat }) => {
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>

      <SideBar />
      <ChatContainer>
        <ChatScreen chat={chat} id={id} />
      </ChatContainer>
    </Container>
  );
};

export default ChatRead;

export async function getServerSideProps({ query }) {
  const serchId = query.id;
  const docRef = doc(db, "chats", serchId);
  const docSnap = await getDoc(docRef);

  return {
    props: {
      chat: JSON.parse(JSON.stringify(docSnap.data())),
      id: serchId,
    },
  };
}
const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-scrolling: none;
  --scrollbar-width: none;
`;
