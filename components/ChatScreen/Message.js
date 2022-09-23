import styled from "styled-components";

const Message = ({ message, chatemail, loginuser }) => {
  const MessageType = loginuser === chatemail ? MyMessage : FrMessage;
  return (
    <Container>
      <MessageType>{message}</MessageType>
    </Container>
  );
};

export default Message;

const Container = styled.div``;

const MessageBubble = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 62px;
  position: relative;
  text-align: right;
`;

const MyMessage = styled(MessageBubble)`
  margin-left: auto;
  background-color: #dcf8c6;
  border-radius: 8px 0px 8px 8px;
`;
const FrMessage = styled(MessageBubble)`
  text-align: left;
  background-color: white;
  border-radius: -0px 15px 15px 15px;
`;
