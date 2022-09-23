import styled from "styled-components";

const Message = ({ message, chatemail, loginuser }) => {
  const MessageType = loginuser === chatemail ? MyMessage : FrMessage;
  return (
    <Container>
      <MessageType>
        <p>{message}</p>
      </MessageType>
    </Container>
  );
};

export default Message;

const Container = styled.div``;

const MessageBubble = styled.div`
  padding: 10px;
  padding-button: 26px;
  text-align: right;
  background-color: white;
  margin-bottom: 10px;
  line-height: 30px;
`;

const MyMessage = styled(MessageBubble)`
  width: 60%;
  margin-left: auto;
  background-color: #dcf8c6;
  border-radius: 8px 0px 8px 8px;
`;
const FrMessage = styled(MessageBubble)`
  text-align: left;
  width: 60%;
  background-color: white;
  border-radius: -0px 15px 15px 15px;
`;
