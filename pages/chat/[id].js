import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
import SideBar from "../../components/SideBar/SideBar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";

const ChatRead = ({ id, chat }) => {
  const router = useRouter();
  const chackRouter = router.asPath;

  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>
      <ScreenHiddenBar>
        <SideBar />
      </ScreenHiddenBar>

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
  @media (min-width: 1200px) {
    max-width: 80%;
    margin: 0 auto;
  }
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-scrolling: none;
  --scrollbar-width: none;
`;

const ScreenHiddenBar = styled.div`
  @media (max-width: 650px) {
    display: none;
  }
`;
