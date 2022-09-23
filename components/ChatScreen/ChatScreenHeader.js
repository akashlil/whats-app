import { IconButton, Avatar, Button } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import CallIcon from "@material-ui/icons/Call";
import { MoreVert } from "@material-ui/icons";
import styled from "styled-components";
const ChatScreenHeader = ({ chatFriendData }) => {
  return (
    <Header>
      <HeaderFastContent>
        <UserAvatar
          src={chatFriendData ? chatFriendData.photoURL : "#"}
        ></UserAvatar>
        <ChatUserEmail>
          <p style={{ margin: "0px" }}>{chatFriendData?.displayName}</p>
          <p style={{ margin: "0px", fontSize: "12px" }}>
            {chatFriendData?.lastSeen
              ? "last seen : " +
                new Date().getHours() +
                ":" +
                new Date().getMinutes() +
                ":" +
                new Date().getSeconds()
              : ""}
          </p>
        </ChatUserEmail>
      </HeaderFastContent>
      <HeaderSecentContent>
        <IconsContaner>
          <IconButton>
            <VideocamIcon></VideocamIcon>
          </IconButton>
          <IconButton>
            <CallIcon></CallIcon>
          </IconButton>
          <IconButton>
            <MoreVert></MoreVert>
          </IconButton>
        </IconsContaner>
      </HeaderSecentContent>
    </Header>
  );
};

export default ChatScreenHeader;

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
`;

const UserAvatar = styled(Avatar)``;

const HeaderFastContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderSecentContent = styled.div``;
const ChatUserEmail = styled.div``;
const IconsContaner = styled.div``;
