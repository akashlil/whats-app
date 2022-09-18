import { IconButton, Avatar } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/Chat";
import styled from "styled-components";
const SideBar = () => {
  return (
    <Container>
      <Header>
        <UserAvatar></UserAvatar>
        <IconsContaner>
          <IconButton>
            <ChatIcon></ChatIcon>
          </IconButton>
          <IconButton>
            <MoreVert></MoreVert>
          </IconButton>
        </IconsContaner>
      </Header>
    </Container>
  );
};

export default SideBar;

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const IconsContaner = styled.div``;
